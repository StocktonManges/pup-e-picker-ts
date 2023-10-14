export const ModifyButton = ({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled: boolean;
}) => (
  <span
    className="modify-button"
    style={{
      opacity: disabled ? 0.5 : 1,
      cursor: disabled ? "not-allowed" : "pointer",
    }}
    onClick={() => {
      if (!disabled) {
        onClick();
      }
    }}
  >
    <i className="fa-solid fa-pen-to-square"></i>
  </span>
);
