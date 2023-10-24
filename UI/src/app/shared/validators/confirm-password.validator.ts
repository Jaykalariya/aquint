import { FormGroup } from "@angular/forms";

export function ConfirmedValidator(controlName: string, matchingControlName: string, controlLabel: string, matchingControlLabel: string){
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors.misMatch) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ misMatch: {
                control: controlLabel,
                matchingControl: matchingControlLabel
            }});
        } else {
            matchingControl.setErrors(null);
        }
    }
}