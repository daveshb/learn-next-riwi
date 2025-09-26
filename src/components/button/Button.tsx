import { JSX } from "react";

interface MiButtonProps {
  text: string;
  icon: JSX.Element | string;
  disabled?: boolean;
  loading?: boolean;
  click?: () => void;
}

export const MiButton = ({
  text,
  icon,
  disabled = false,
  loading = false,
  click,
}: MiButtonProps) => {
  return (
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
  );
};
