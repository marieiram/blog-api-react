function ConfirmDialog({ isOpen, title, description, ActionLabel, onAction, onCancel }) {
    const overlayStyle = {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    };

    if (!isOpen) return null;
    return (
        <div style={overlayStyle}>
            <dialog open={isOpen}>
                <h2>{title}</h2>
                <p>{description}</p>
                <button onClick={onAction}>{ActionLabel}</button>
                <button onClick={onCancel}>キャンセル</button>
            </dialog >
        </div>
    );
}

export default ConfirmDialog;