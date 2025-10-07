import { JSX } from "react";

interface MiButtonProps {
  text: string;
  icon: JSX.Element | string;
  disabled?: boolean;
  loading?: boolean;
  click?: () => void;
  labelButton?: string
}

export const MiButton = ({
  text,
  icon,
  disabled = false,
  loading = false,
  click,
  labelButton
}: MiButtonProps) => {
  return (
    <div>
      <label>{labelButton}</label>
      <button
        onClick={click}
        className={`components__button ${
          disabled ? "components__button--disabled" : ""
        } `}
        disabled={disabled || loading}
      >
        <div>{loading ? "Cargando..." : text}</div>
        <div>{icon}</div>
      </button>
    </div>
  );
};
