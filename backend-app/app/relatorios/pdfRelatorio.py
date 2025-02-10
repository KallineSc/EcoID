from fpdf import FPDF
from ..relatorios.relatorioStrategy import RelatorioStrategy

class PDFRelatorio(RelatorioStrategy):
    """Implementação de geração de relatório PDF."""

    def generate(self, data):
        file_path = "denuncias_report.pdf"
        pdf = FPDF()
        pdf.set_auto_page_break(auto=True, margin=15)
        pdf.add_page()
        pdf.set_font("Arial", size=12)
        pdf.cell(200, 10, "Relatório de Denúncias", ln=True, align="C")
        pdf.ln(10)

        for denuncia in data:
            pdf.cell(200, 10, f"ID: {denuncia['id']}", ln=True)
            pdf.cell(200, 10, f"Título: {denuncia['titulo']}", ln=True)
            pdf.cell(200, 10, f"Descrição: {denuncia['descricao']}", ln=True)
            pdf.cell(200, 10, f"Latitude: {denuncia['latitude']} | Longitude: {denuncia['longitude']}", ln=True)
            pdf.cell(200, 10, f"Usuário ID: {denuncia['usuario_id']}", ln=True)
            pdf.ln(10)
        
        pdf.output("app/relatorios/"+file_path)
        return file_path
