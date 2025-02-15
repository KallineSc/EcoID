class RelatorioService:
    """Serviço que define qual estratégia será usada."""

    def __init__(self):
        self._strategy = None

    def set_strategy(self, strategy):
        self._strategy = strategy

    def generate(self, data):
        if not self._strategy:
            raise ValueError("Nenhuma estratégia definida")
        return self._strategy.generate(data)
