import React from "react";
import {Controller, useForm} from "react-hook-form";
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod";
import {Field, FieldContent, FieldGroup, FieldLabel, FieldTitle} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";

// name
// singular
// has_leage
// id

const formSchema = z.object({
    name: z.string().min(2, "نام ورزش بایستی حداقل از 2 حرف تشکیل شده باشد."),
    singular: z.boolean().default(false),
    has_leage: z.boolean().default(true),
});

export function SportForm() {
    const form =
        useForm < z.infer < typeof formSchema >> ({
            resolver: zodResolver(formSchema),
            defaultValues: {
                name: "",
                singular: false,
                has_leage: true,
            },
        })

    // function onSubmit(data: z.infer<typeof formSchema>) {
    function onSubmit(data) {
        console.log(data);
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>افزودن ورزش جدید</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)} id={"form-sport"}>
                    <FieldGroup>
                        <Controller name={"name"} control={form.control} render={({field, fieldState}) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={"sport-name"}>نام ورزش</FieldLabel>
                                <Input  {...field} id="sport-name" aria-invalid={fieldState.invalid}/>
                            </Field>
                        )}/>
                        <Controller name={"singular"} control={form.control} render={({field, fieldState}) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={"singular"}>نوع ورزش (انفرادی یا گروهی)</FieldLabel>
                                <Select name="singular" value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger
                                        id="form-rhf-select-language"
                                        aria-invalid={fieldState.invalid}
                                        className="min-w-30"
                                    >
                                        <SelectValue placeholder="انتخاب کنید"/>
                                    </SelectTrigger>
                                    <SelectContent position="item-aligned">
                                        <SelectItem value="true">انفرادی</SelectItem>
                                        <SelectItem value="false">گروهی</SelectItem>
                                    </SelectContent>
                                </Select>
                            </Field>
                        )}/>
                        <Controller name={'has_leage'} control={form.control} render={({field, fieldState}) => (
                            <RadioGroup name={field.name} value={field.value} onValueChange={field.onChange}
                                        aria-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={"has_leage_1"}>
                                    <Field orientation={'horizontal'} data-invalid={fieldState.invalid}>
                                        <FieldContent>
                                            <FieldTitle>دارای لیگ</FieldTitle>
                                            <RadioGroupItem value="true" id="has_leage_1"
                                                            aria-invalid={fieldState.invalid}/>
                                        </FieldContent>
                                    </Field>
                                </FieldLabel>
                                <FieldLabel htmlFor={"has_leage_2"}>
                                    <Field orientation={'horizontal'} data-invalid={fieldState.invalid}>
                                        <FieldContent>
                                            <FieldTitle>بدون لیگ</FieldTitle>
                                            <RadioGroupItem value="false" id="has_leage_2"
                                                            aria-invalid={fieldState.invalid}/>
                                        </FieldContent>
                                    </Field>
                                </FieldLabel>
                            </RadioGroup>
                        )}/>
                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter>
                <Field orientation={'horizontal'}>
                    <Button type="button" variant="outline" onClick={() => form.reset()}>
                        انصراف
                    </Button>
                    <Button type="submit" form="form-sport">
                        ذخیره
                    </Button>
                </Field>
            </CardFooter>
        </Card>

    );
}
