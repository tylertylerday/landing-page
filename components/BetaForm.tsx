"use client";

import React, { useState } from "react";
import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    instagram: z.string().optional(),
    tiktok: z.string().optional(),
    youtube: z.string().optional(),
    twitch: z.string().optional(),
    comments: z.string().optional(),
    privacyPolicy: z.boolean().refine((val) => val === true, {
        message: "You must agree to the privacy policy",
    }),
});

type FormValues = z.infer<typeof formSchema>;

const BetaForm = () => {
    const [isSuccess, setIsSuccess] = useState(false);

    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            instagram: "",
            tiktok: "",
            youtube: "",
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

                setIsSuccess(true);
                form.reset();
            } catch (error) {
                console.error("Submission error:", error);
                alert(error instanceof Error ? error.message : "Something went wrong. Please try again.");
            }
        },
    });

    if (isSuccess) {
        return (
            <div className="w-full max-w-md mx-auto p-8 bg-[#160C24] rounded-xl border border-[#2D1947] text-center space-y-6">
                <div className="w-16 h-16 bg-[#9653ED]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-[#9653ED]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-white">Success!</h2>
                <p className="text-[#E3E3E3]">
                    Thanks for your interest in Co-Splay. We've received your information and will be in touch soon.
                </p>
                <div className="pt-4 border-t border-[#2D1947]">
                    <p className="text-sm text-[#B0B0B0] mb-2">
                        Have additional questions?
                    </p>
                    <a
                        href="mailto:contact@co-splay.com"
                        className="text-[#c399fa] transition-colors hover:text-[#7a3bc9]"
                    >
                        contact@co-splay.com
                    </a>
                </div>
                <div className="pt-4">
                    <Link href="/">
                        <Button className="w-full bg-[#291F33] hover:bg-[#3a2e47] text-white border border-[#444]">
                            Back to Homepage
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

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
                            <Label htmlFor={field.name} className="text-[#E3E3E3]">Name *</Label>
                            <Input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className="bg-[#291F33] border-[#444] text-white"
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
                            <Label htmlFor={field.name} className="text-[#E3E3E3]">Email *</Label>
                            <Input
                                id={field.name}
                                name={field.name}
                                type="email"
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className="bg-[#291F33] border-[#444] text-white"
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
                            <Label htmlFor={field.name} className="text-[#E3E3E3]">Phone</Label>
                            <PhoneInput
                                id={field.name}
                                name={field.name}
                                value={field.state.value || ""}
                                onBlur={field.handleBlur}
                                onChange={(value) => field.handleChange(value)}
                                defaultCountry="US"
                            />
                        </div>
                    )}
                />

                <div className="grid grid-cols-2 gap-4">
                    <form.Field
                        name="instagram"
                        children={(field) => (
                            <div className="space-y-2">
                                <Label htmlFor={field.name} className="text-[#E3E3E3]">Instagram</Label>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value || ""}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    className="bg-[#291F33] border-[#444] text-white"
                                    placeholder="@handle"
                                />
                            </div>
                        )}
                    />
                    <form.Field
                        name="tiktok"
                        children={(field) => (
                            <div className="space-y-2">
                                <Label htmlFor={field.name} className="text-[#E3E3E3]">TikTok</Label>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value || ""}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    className="bg-[#291F33] border-[#444] text-white"
                                    placeholder="@handle"
                                />
                            </div>
                        )}
                    />
                    <form.Field
                        name="youtube"
                        children={(field) => (
                            <div className="space-y-2">
                                <Label htmlFor={field.name} className="text-[#E3E3E3]">Youtube</Label>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value || ""}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    className="bg-[#291F33] border-[#444] text-white"
                                    placeholder="@handle"
                                />
                            </div>
                        )}
                    />
                    <form.Field
                        name="twitch"
                        children={(field) => (
                            <div className="space-y-2">
                                <Label htmlFor={field.name} className="text-[#E3E3E3]">Twitch</Label>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value || ""}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    className="bg-[#291F33] border-[#444] text-white"
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
                            <Label htmlFor={field.name} className="text-[#E3E3E3]">Comments or Questions</Label>
                            <Textarea
                                id={field.name}
                                name={field.name}
                                value={field.state.value || ""}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className="bg-[#291F33] border-[#444] text-white min-h-[100px]"
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
                                    className="bg-[#291F33] border-[#444]"
                                />

                                <Label htmlFor={field.name} className="text-sm font-normal text-[#E3E3E3]">
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
