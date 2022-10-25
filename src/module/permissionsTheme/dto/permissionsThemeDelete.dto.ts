import {IsInt, NotEquals} from "@/utils/verifyParam/customValidationDecorators";

export class PermissionsThemeDeleteDto {

    @IsInt()
    @NotEquals(0)
    permissionsThemeId: number;

    constructor() {
        this.permissionsThemeId = 0
    }

}