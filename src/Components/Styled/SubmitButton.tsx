interface submitButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export const SubmitButton = ({
  children,
  onClick,
  className,
  disabled,
}: submitButtonProps) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className={
        "w-32 rounded-md bg-blue-600 p-2 text-white transition duration-300 ease-in-out hover:scale-105 hover:border-transparent" +
        (className ? " " + className : "")
      }
      disabled={disabled}
    >
      {children}
    </button>
  );
};
