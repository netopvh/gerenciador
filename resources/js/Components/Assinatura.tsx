import React from "react";
import Ass from "../Images/assinatura.png";

interface Props {
    className: string;
}

export default function Assinatura({ className }: Props) {
    return <img src={Ass} className={className} />;
}
