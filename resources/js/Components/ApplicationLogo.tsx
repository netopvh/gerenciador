import React from "react";
import Logo from "../Images/logo.png";

interface Props {
    className: string;
}

export default function ApplicationLogo({ className }: Props) {
    return <img src={Logo} className={className} />;
}
