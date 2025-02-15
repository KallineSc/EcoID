import os
from flask import send_file, request
from flask_restx import Resource, Namespace
from flask_jwt_extended import jwt_required
from ..relatorios.relatorioService import RelatorioService
from ..relatorios.csvRelatorio import CSVRelatorio
from ..relatorios.jsonRelatorio import JSONRelatorio
from ..relatorios.pdfRelatorio import PDFRelatorio
from ..models.denunciaModel import Denuncia

relatorioNs = Namespace("relatorios", description="Geração de relatórios de denúncias")

@relatorioNs.route("/denuncias")
class RelatorioResource(Resource):
    @relatorioNs.doc(description="Gera um relatório de denúncias em diferentes formatos", 
                  security="Bearer",
                  params={
                    "formato": "Formato do relatório (json, csv, pdf)"
                    })
    @jwt_required()
    def get(self):
        """Gera relatório de denúncias (CSV, JSON ou PDF)"""
        formato = request.args.get("formato", "json")
        relatorioService = RelatorioService()

        if formato == "csv":
            relatorioService.set_strategy(CSVRelatorio())
        elif formato == "json":
            relatorioService.set_strategy(JSONRelatorio())
        elif formato == "pdf":
            relatorioService.set_strategy(PDFRelatorio())
        else:
            return {"error": "Formato inválido"}, 400

        denuncias = Denuncia.query.all()
        data = [
            {
                "id": str(d.id),
                "titulo": d.titulo,
                "descricao": d.descricao,
                "latitude": d.latitude,
                "longitude": d.longitude,
                "usuario_id": str(d.usuario_id)
            }
            for d in denuncias
        ]
        print(data, flush=True)
        file_name = relatorioService.generate(data)
        print(file_name, flush=True)
        
        directory = "app/relatorios"
        file_path = os.path.join(os.getcwd(), directory, file_name)
        print(file_path, flush=True)

        if os.path.exists(file_path):
            return send_file(file_path, as_attachment=True)
        else:
            return {"error": "Arquivo não encontrado"}, 404
