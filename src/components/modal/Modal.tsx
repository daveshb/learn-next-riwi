interface ModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  desc?: string;
  onCancel?: () => void;
  onSave?: () => void;
  isOpen: boolean
}

export const Modal = ({
  title,
  onClose,
  children,
  desc,
  onCancel,
  onSave,
  isOpen
}: ModalProps) => {


  if (!isOpen) return null;

  return (
    <>
      {/* {isOpen && ( */}
      <div className="modalOverlay">
        <div className="modalContainer">
          <header className="modalContainer__header">
            <h2>{title}</h2>
            <div>
              <button onClick={onClose}>X</button>
            </div>
          </header>
          <div className="modalContainer__children">{children}</div>
          <footer className="modalContainer__footer">
            <div>{desc}</div>
            <div className="modalContainer__buttons">
              <button onClick={onCancel}>Cancel</button>
              <button onClick={onSave}>Save</button>
            </div>
          </footer>
        </div>
      </div>
      {/* )} */}
    </>
  );
};
