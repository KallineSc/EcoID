import csv
from ..relatorios.relatorioStrategy import RelatorioStrategy

class CSVRelatorio(RelatorioStrategy):
    """Implementação de geração de relatório CSV."""

    def generate(self, data):
        file_path = "denuncias_report.csv"
        with open("app/relatorios/"+file_path, mode="w", newline="") as file:
            writer = csv.writer(file)
            writer.writerow(["ID", "Título", "Descrição", "Latitude", "Longitude", "Usuário"])
            for denuncia in data:
                writer.writerow([denuncia["id"], denuncia["titulo"], denuncia["descricao"], denuncia["latitude"], denuncia["longitude"], denuncia["usuario_id"]])
        return file_path
