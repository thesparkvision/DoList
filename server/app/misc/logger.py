import logging
import uvicorn
from app.config.settings import app_settings

logger = logging.root
handler = logging.StreamHandler()
console_formatter = uvicorn.logging.ColourizedFormatter(
    "{levelprefix:<8} {message}",
    style="{",
    use_colors=True
)
handler.setFormatter(console_formatter)
logger.handlers = [handler]
logger.setLevel(logging.DEBUG)