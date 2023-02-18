import moment from "moment";

export function useFindDtoFormatToFilterTips(findDto:any) {
    let filterTips = "";

    if (findDto.hasOwnProperty('startDate') && findDto.hasOwnProperty('endDate')) {
        const startDate = moment(findDto.startDate).format('YYYY年MM月DD日');
        const endDate = moment(findDto.endDate).format('YYYY年MM月DD日');
        filterTips = filterTips + `出仓日期：${startDate} - ${endDate}`
    }

    if (findDto.hasOwnProperty('outboundcode') && findDto.outboundcode.length !== 0) {
        const outboundcode = findDto.outboundcode;
        const tipsName = "单号"
        filterTips = filterTips + ` ${tipsName}：${outboundcode}`
    }

    if (findDto.hasOwnProperty('clientname') && findDto.clientname.length !== 0) {
        const clientname = findDto.clientname;
        filterTips = filterTips + ` 客户名称：${clientname}`
    }

    if (findDto.hasOwnProperty('ymrep') && findDto.ymrep.length !== 0) {
        const ymrep = findDto.ymrep;
        filterTips = filterTips + ` 业务员：${ymrep}`
    }

    if (findDto.hasOwnProperty('moneytype') && findDto.moneytype.length !== 0) {
        const moneytype = findDto.moneytype;
        filterTips = filterTips + ` 结算方式：${moneytype}`
    }

    if (findDto.hasOwnProperty('remark1') && findDto.remark1.length !== 0) {
        const remark1 = findDto.remark1;
        filterTips = filterTips + ` 备注1：${remark1}`
    }

    if (findDto.hasOwnProperty('remark2') && findDto.remark2.length !== 0) {
        const remark2 = findDto.remark2;
        filterTips = filterTips + ` 备注2：${remark2}`
    }

    if (findDto.hasOwnProperty('remark3') && findDto.remark3.length !== 0) {
        const remark3 = findDto.remark3;
        filterTips = filterTips + ` 备注3：${remark3}`
    }

    if (findDto.hasOwnProperty('remark4') && findDto.remark4.length !== 0) {
        const remark4 = findDto.remark4;
        filterTips = filterTips + ` 备注4：${remark4}`
    }

    if (findDto.hasOwnProperty('remark5') && findDto.remark5.length !== 0) {
        const remark5 = findDto.remark5;
        filterTips = filterTips + ` 备注5：${remark5}`
    }

    //inbound
    if (findDto.hasOwnProperty('inboundcode') && findDto.inboundcode.length !== 0) {
        const inboundcode = findDto.inboundcode;
        const tipsName = "单号";
        filterTips = filterTips + ` ${tipsName}：${inboundcode}`
    }

    if (findDto.hasOwnProperty('buyname') && findDto.buyname.length !== 0) {
        const tipsContent = findDto.buyname;
        const tipsName = "供应商";
        filterTips = filterTips + ` ${tipsName}：${tipsContent}`
    }

    return filterTips
}