import { ColDef, ColGroupDef, ColumnApi, GridApi } from "ag-grid-community";
import { ITableColumnState, TableColumnStateService } from "@/module/tableColumnState/tableColumnState.service";
import { ColumnState } from "ag-grid-community/dist/lib/columns/columnModel";

export function useErpTable(
  tableName: string,
  getGridApi: () => GridApi | null,
  getColumnApi: () => ColumnApi | null
) {

  const canEditCol: string[] = [];
  const tableColumnStateService = new TableColumnStateService(tableName);
  //默认本地配置
  let defaultTableConfigStateList: ITableColumnState[] = [];


  //初始化表格列配置
  async function init() {
    if (canEditCol.length === 0) getCanEditColList();
    const gridApi = getGridApi();
    if (!gridApi) return;
    const columnApi = getColumnApi();
    if (!columnApi) return;

    //初始化本地默认配置
    if (defaultTableConfigStateList.length === 0) {
      defaultTableConfigStateList = getGridTableColumnState();
    }

    //从数据库获取列配置
    let tableColumnStateList = await getDataBaseTableColumnState();
    if (
      tableColumnStateList.length === 0 &&
      defaultTableConfigStateList.length !== 0
    ) {
      //如果获取不到服务器配置,就使用默认配置
      tableColumnStateList = defaultTableConfigStateList;
    }

    //把数据库定义设置到Grid定义上面
    const gridColDef = getGridColumnDefine();
    setColumnHeaderName(gridColDef, tableColumnStateList);
    gridApi.setColumnDefs(gridColDef);
    //排序
    columnApi.applyColumnState({
      state: tableColumnStateListFormatColumnStateList(tableColumnStateList),
      applyOrder: true
    });
  }

  //允许表格可以编辑
  function startEditTable() {
    const gridApi = getGridApi();
    if (!gridApi) return;
    //拖动显示
    gridApi.setSuppressRowDrag(false);
    //可以编辑
    for (let i = 0; i < canEditCol.length; i++) {
      const col = gridApi.getColumnDef(canEditCol[i]);
      if (col) col.editable = true;
    }
  }

  //禁止表格可以编辑
  function endEditTable() {
    const gridApi = getGridApi();
    if (!gridApi) return;
    //拖动隐藏
    gridApi.setSuppressRowDrag(true);
    //禁止编辑
    for (let i = 0; i < canEditCol.length; i++) {
      const col = gridApi.getColumnDef(canEditCol[i]);
      if (col) col.editable = false;
    }
  }

  //保存列定义
  async function saveColumnDefine(tableColumnStates: ITableColumnState[]) {
    await tableColumnStateService.saveColumnState(tableColumnStates);
    await init();
  }

  //重置列定义
  async function removeColumnDefine() {
    await tableColumnStateService.removeColumnState();
    await init();
  }

  //获取数据库列定义
  function getGridTableColumnState() {
    const tableColumnStateList: ITableColumnState[] = [];
    columnDefineListFormatTableColumnStateList(getGridColumnDefine(), tableColumnStateList);
    setSnToTableColumnState(tableColumnStateList);
    return tableColumnStateList;
  }

  //数据库列定义设置顺序号
  function setSnToTableColumnState(tableColumnStateList: ITableColumnState[]) {
    tableColumnStateList.sort((a, b) => {
      if (a.pinned === "left" && b.pinned === "right") {
        return -1;
        // } else if (a.pinned.length !== 0 && b.pinned.length === 0) {
        //     return -1
      } else {
        return 0;
      }
    });

    //如果有顺序,就允许定义列顺序
    for (let i = 0; i < tableColumnStateList.length; i++) {
      tableColumnStateList[i].sn = i;
    }
    return tableColumnStateList;
  }

  //表格设置列名
  function setColumnHeaderName(columnDefinesFromGird: (ColDef | ColGroupDef)[], tableColumnStateList: ITableColumnState[]) {
    for (let i = 0; i < columnDefinesFromGird.length; i++) {
      for (let j = 0; j < tableColumnStateList.length; j++) {
        const tableColumnState = tableColumnStateList[j];

        if (
          isHasColIdColumn(columnDefinesFromGird[i])
          && isHasColIdColumn(tableColumnState)
        ) {

          const colDef = columnDefinesFromGird[i] as ColDef;
          if (colDef.colId === tableColumnState.colId && tableColumnState.headerName && tableColumnState.headerName.length > 0) {
            colDef.headerName = tableColumnState.headerName;
          }

        } else {
          const ColGroupDef = columnDefinesFromGird[i] as ColGroupDef;

          if (
            isHasColIdColumn(tableColumnState) &&
            ColGroupDef.groupId === tableColumnState.colId &&
            tableColumnState.headerName &&
            tableColumnState.headerName.length > 0
          ) {
            ColGroupDef.headerName = tableColumnState.headerName;
          }

          if (ColGroupDef.children.length > 0) {
            setColumnHeaderName(ColGroupDef.children, tableColumnStateList);
          }
        }
      }
    }
  }

  //数据库列定义数组转表格列定义数组
  function tableColumnStateListFormatColumnStateList(tableColumnStateList: ITableColumnState[]): ColumnState[] {
    const columnStates: ColumnState[] = [];
    for (let i = 0; i < tableColumnStateList.length; i++) {
      const tableColumnState = tableColumnStateList[i];
      const columnState: ColumnState = {
        colId: tableColumnState.colId,
        hide: tableColumnState.hide,
        width: tableColumnState.width,
        pinned: tableColumnState.pinned,
        pivot: tableColumnState.pivot,
        pivotIndex: tableColumnState.pivotIndex,
        sort: tableColumnState.sort,
        sortIndex: tableColumnState.sortIndex
      };
      columnStates.push(columnState);
    }
    return columnStates;
  }

  //获取默认可编辑列
  function getCanEditColList() {
    const colDefs = getGridColumnDefine();
    for (let i = 0; i < colDefs.length; i++) {
      const col = colDefs[i] as ColDef;
      if (Reflect.has(col, "colId") && col.colId && col.editable) {
        canEditCol.push(col.colId);
      }
    }
  }

  //从表格获取列定义
  function getGridColumnDefine(): (ColDef | ColGroupDef)[] {
    const gridApi = getGridApi();
    if (gridApi) {
      return gridApi.getColumnDefs() as (ColDef | ColGroupDef)[];
    } else {
      return [];
    }
  }

  //从服务器获取列定义
  async function getDataBaseTableColumnState(): Promise<ITableColumnState[]> {
    return await tableColumnStateService.getTableColumnState();
  }

  //对象是否为列
  function isHasColIdColumn(columnDefine: (ColDef | ColGroupDef)): boolean {
    //type 'colId' is ColDef, 'groupId' is ColGroupDef
    return Reflect.has(columnDefine, "colId");
  }

  //表格列定义数组 格式化成 数据库列定义数组
  function columnDefineListFormatTableColumnStateList(columnDefineList: (ColDef | ColGroupDef)[], tableColumnStateList: ITableColumnState[]): ITableColumnState[] {
    for (let i = 0; i < columnDefineList.length; i++) {
      const columnDefine = columnDefineList[i];
      const tableColumnState = columnDefineFormatTableColumnState(columnDefine);
      tableColumnStateList.push(tableColumnState);

      if (tableColumnState.isGroup) {
        columnDefineListFormatTableColumnStateList((columnDefine as ColGroupDef).children, tableColumnStateList);
      }
    }
    return tableColumnStateList;
  }

  //列定义 格式化成 数据库列定义
  function columnDefineFormatTableColumnState(columnDefine: ColDef | ColGroupDef): ITableColumnState {
    if (isHasColIdColumn(columnDefine)) {
      return colDefFormatTableColumnState(columnDefine);
    } else {
      return colGroupFormatTableColumnState(<ColGroupDef>columnDefine);
    }
  }

  //colGroup format to tableColumnState
  function colGroupFormatTableColumnState(columnState: ColGroupDef): ITableColumnState {
    return {
      colId: columnState.groupId || "",
      editable: false,
      isGroup: true,
      headerName: columnState.headerName || "",
      headerClass: "",
      hide: false,
      parentId: "",
      pinned: false,
      pivot: false,
      pivotIndex: 0,
      rowGroup: false,
      rowGroupIndex: 0,
      sn: 0,
      sort: null,
      sortIndex: 0,
      width: 0

    };
  }

  //colDef format to tableColumnState
  function colDefFormatTableColumnState(columnState: ColDef): ITableColumnState {
    return {
      colId: (columnState as ColDef).colId || "",
      editable: Boolean((columnState as ColDef).editable as boolean || true),
      isGroup: false,
      headerClass: "",
      headerName: (columnState as ColDef).headerName || "",
      hide: Boolean((columnState as ColDef).hide || false),
      parentId: "",
      pinned: (columnState as ColDef).pinned || false,
      pivot: Boolean((columnState as ColDef).pivot || false),
      pivotIndex: (columnState as ColDef).pivotIndex || 0,
      rowGroup: Boolean((columnState as ColDef).rowGroup || false),
      rowGroupIndex: (columnState as ColDef).rowGroupIndex || 0,
      sn: 0,
      sort: (columnState as ColDef).sort! || "",
      sortIndex: (columnState as ColDef).sortIndex || 0,
      width: (columnState as ColDef).width! || 0
    };
  }

  return {
    init,
    startEditTable,
    endEditTable,
    saveColumnDefine,
    removeColumnDefine,
    getGridTableColumnState,
    setSnToTableColumnState,

  }
}