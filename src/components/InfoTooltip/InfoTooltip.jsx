import './InfoTooltip.css';

export default function InfoTooltip({ onClose, params: { isOpen, success, err } }) {
  function handleClickOverlay(evt) {
    evt.stopPropagation();
  }

  return (
    <div className={`info-tooltip ${isOpen && 'info-tooltip_opened'}`} onClick={onClose}>
      <div className="info-tooltip__content" onClick={handleClickOverlay}>
        <div className={`info-tooltip__icon ${success ? 'info-tooltip__icon_done' : 'info-tooltip__icon_false'}`}></div>
        <h2 className="info-tooltip__title">{err}</h2>
        <button type="button" className="info-tooltip__close-button" onClick={onClose}></button>
      </div>
    </div>
  );
}