from abc import ABC, abstractmethod

class RelatorioStrategy(ABC):
    @abstractmethod
    def generate(self, data):
        pass
