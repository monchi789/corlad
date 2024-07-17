from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.exceptions import NotFound

class CustomPagination(PageNumberPagination):
    page_size = 10  # Número de resultados por página
    page_size_query_param = 'page_size'
    max_page_size = 100  # Tamaño máximo de página permitido
    invalid_page_message = 'Página inválida. Detalles: {message}'

    def paginate_queryset(self, queryset, request, view=None):
        """
        Pagina el queryset si es necesario. Devuelve un objeto paginado si se ha paginado,
        de lo contrario, devuelve el queryset original.
        """
        self.page_size = self.get_page_size(request)
        page_number = request.query_params.get('page')

        if not page_number:
            return None

        paginator = self.django_paginator_class(queryset, self.page_size)

        try:
            page = paginator.page(page_number)
        except Exception as exc:
            raise NotFound("Página solicitada inválida") from exc

        self.page = page
        return list(page.object_list)

    def get_paginated_response(self, data):
        """
        Devuelve una respuesta paginada para la petición actual.
        """
        return Response({
            'count': self.page.paginator.count,
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'results': data
        })
