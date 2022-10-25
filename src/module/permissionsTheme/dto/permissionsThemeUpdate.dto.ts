import {PermissionsThemeCreateDto} from "@/module/permissionsTheme/dto/permissionsThemeCreate.dto";
import {IsInt, NotEquals} from "@/utils/verifyParam/customValidationDecorators";
import {IPermissionsTheme} from "@/module/permissionsTheme/permissionsTheme";

export class PermissionsThemeUpdateDto extends PermissionsThemeCreateDto{

    @IsInt()
    @NotEquals(0)
    permissionsThemeId:number;

    constructor(permissionsTheme:IPermissionsTheme) {
        super();
        this.permissionsThemeId = permissionsTheme.permissionsThemeId;
        this.permissionsThemeName = permissionsTheme.permissionsThemeName;
        this.printid = permissionsTheme.printid;
    }
}