import json
from ..relatorios.relatorioStrategy import RelatorioStrategy

class JSONRelatorio(RelatorioStrategy):
    """Implementação de geração de relatório JSON."""

    def generate(self, data):
        """Gera o relatório no formato JSON e salva em um arquivo."""
        # Defina o caminho onde o arquivo JSON será salvo
        file_path = "denuncias_report.json"
        
        # Abrindo o arquivo no modo de escrita
        with open("app/relatorios/"+file_path, "w", encoding="utf-8") as file:
            # Convertendo os dados para o formato JSON com indentação
            json.dump(data, file, ensure_ascii=False, indent=4)
        
        # Retorna o caminho do arquivo gerado
        return file_path
