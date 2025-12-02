"use client";

import React from "react";
import { useForm } from "@tanstack/react-form";

import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    instagram: z.string().optional(),
    tiktok: z.string().optional(),
    x: z.string().optional(),
    twitch: z.string().optional(),
    comments: z.string().optional(),
    privacyPolicy: z.boolean().refine((val) => val === true, {
        message: "You must agree to the privacy policy",
    }),
});

type FormValues = z.infer<typeof formSchema>;

const BetaForm = () => {
    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            instagram: "",
            tiktok: "",
            x: "",
            twitch: "",
            comments: "",
            privacyPolicy: false,
        } as FormValues,

        validators: {
            onChange: formSchema,
        },
        onSubmit: async ({ value }) => {
            try {
                const response = await fetch("/api/beta", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(value),
                });

                if (!response.ok) {
                    const data = await response.json();
                    throw new Error(data.error || "Failed to submit");
                }

                alert("Thanks for your interest! We'll be in touch.");
                form.reset();
            } catch (error) {
                console.error("Submission error:", error);
                alert(error instanceof Error ? error.message : "Something went wrong. Please try again.");
            }
        },
    });

    return (
        <div className="w-full max-w-md mx-auto p-6 bg-[#160C24] rounded-xl border border-[#2D1947]">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                }}
                className="space-y-6"
            >
                <form.Field
                    name="name"
                    children={(field) => (
                        <div className="space-y-2">
                            <Label htmlFor={field.name}>Name *</Label>
                            <Input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className="bg-[#131313] border-[#444] text-white"
                            />
                            {field.state.meta.errors ? (
                                <p className="text-red-300 text-sm">
                                    {field.state.meta.errors.map((e: any) => e?.message || e).join(", ")}
                                </p>
                            ) : null}
                        </div>
                    )}
                />

                <form.Field
                    name="email"
                    children={(field) => (
                        <div className="space-y-2">
                            <Label htmlFor={field.name}>Email *</Label>
                            <Input
                                id={field.name}
                                name={field.name}
                                type="email"
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className="bg-[#131313] border-[#444] text-white"
                            />
                            {field.state.meta.errors ? (
                                <p className="text-red-300 text-sm">
                                    {field.state.meta.errors.map((e: any) => e?.message || e).join(", ")}
                                </p>
                            ) : null}
                        </div>
                    )}
                />

                <form.Field
                    name="phone"
                    children={(field) => (
                        <div className="space-y-2">
                            <Label htmlFor={field.name}>Phone</Label>
                            <Input
                                id={field.name}
                                name={field.name}
                                type="tel"
                                value={field.state.value || ""}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className="bg-[#131313] border-[#444] text-white"
                            />
                        </div>
                    )}
                />

                <div className="grid grid-cols-2 gap-4">
                    <form.Field
                        name="instagram"
                        children={(field) => (
                            <div className="space-y-2">
                                <Label htmlFor={field.name}>Instagram</Label>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value || ""}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    className="bg-[#131313] border-[#444] text-white"
                                    placeholder="@handle"
                                />
                            </div>
                        )}
                    />
                    <form.Field
                        name="tiktok"
                        children={(field) => (
                            <div className="space-y-2">
                                <Label htmlFor={field.name}>TikTok</Label>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value || ""}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    className="bg-[#131313] border-[#444] text-white"
                                    placeholder="@handle"
                                />
                            </div>
                        )}
                    />
                    <form.Field
                        name="x"
                        children={(field) => (
                            <div className="space-y-2">
                                <Label htmlFor={field.name}>X "Twitter"</Label>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value || ""}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    className="bg-[#131313] border-[#444] text-white"
                                    placeholder="@handle"
                                />
                            </div>
                        )}
                    />
                    <form.Field
                        name="twitch"
                        children={(field) => (
                            <div className="space-y-2">
                                <Label htmlFor={field.name}>Twitch</Label>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value || ""}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    className="bg-[#131313] border-[#444] text-white"
                                    placeholder="@handle"
                                />
                            </div>
                        )}
                    />
                </div>

                <form.Field
                    name="comments"
                    children={(field) => (
                        <div className="space-y-2">
                            <Label htmlFor={field.name}>Comments or Questions</Label>
                            <Textarea
                                id={field.name}
                                name={field.name}
                                value={field.state.value || ""}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className="bg-[#131313] border-[#444] text-white min-h-[100px]"
                            />
                        </div>
                    )}
                />

                <form.Field
                    name="privacyPolicy"
                    children={(field) => (
                        <>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id={field.name}
                                    checked={field.state.value}
                                    onCheckedChange={(checked) => field.handleChange(checked === true)}
                                />
                                <Label htmlFor={field.name} className="text-sm font-normal text-gray-300">
                                    By clicking submit, you agree to be contacted by Co-Splay.
                                </Label>
                            </div>
                            {field.state.meta.errors ? (
                                <p className="text-red-300 text-sm mt-1">
                                    {field.state.meta.errors.map((e: any) => e?.message || e).join(", ")}
                                </p>
                            ) : null}
                        </>
                    )}
                />
                <form.Subscribe
                    selector={(state) => [state.canSubmit, state.isSubmitting]}
                    children={([canSubmit, isSubmitting]) => (
                        <Button type="submit" className="w-full bg-[#9653ED] hover:bg-[#7a3bc9] text-white" disabled={!canSubmit}>
                            {isSubmitting ? "Submitting..." : "Join Waitlist"}
                        </Button>
                    )}
                />
            </form>
        </div>
    );
};

export default BetaForm;
