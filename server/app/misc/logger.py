import logging
import uvicorn

logger = logging.root
handler = logging.StreamHandler()
console_formatter = uvicorn.logging.ColourizedFormatter(
    "{levelprefix:<8} {message}", style="{", use_colors=True
)
handler.setFormatter(console_formatter)
logger.handlers = [handler]
logger.setLevel(logging.DEBUG)
