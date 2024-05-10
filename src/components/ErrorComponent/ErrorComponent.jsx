import "./ErrorComponent.css"

function ErrorComponent({ status, message, small }) {
  return <h2 className={"error-message" + (small ? " error-message-small" : "")}>{`${status} ${message}`}</h2>
}

export default ErrorComponent