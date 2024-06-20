import "./styles.css";

export default function Button({ text, onClick, disabled }) {
  return (
    <div onClick={onClick} className="custom-btn" disabled={disabled}>
      {text}
    </div>
  );
}
