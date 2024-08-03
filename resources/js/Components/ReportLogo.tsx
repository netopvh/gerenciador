import React from "react";
import Logo from "../Images/recibo.png";

interface Props {
    className: string;
}

export default function ReportLogo({ className }: Props) {
    return <img src={Logo} className={className} />;
}
