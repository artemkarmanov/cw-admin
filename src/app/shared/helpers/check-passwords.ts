// We suppose that FormGroup has password and password2 fields
import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";

export function checkPasswords(): ValidatorFn {
	return (_: AbstractControl): ValidationErrors | null => {
		const form: FormGroup = _ as FormGroup;
		if (form.get('password')?.value === form.get('password2')?.value) return null;
		return {
			passwordsDiffers: true
		}
	};
}
