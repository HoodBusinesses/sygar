import { PaginationDto } from '../dto/pagination.dto';


export const getPaginationResponse = (
	query: PaginationDto,
	totalAmount: number,
) => {
	return {
		page: query.page,
		totalPages: Math.ceil(totalAmount / query.limit),
		totalAmount,
	};
};

export const getPaginationQuery = (query: PaginationDto) => {
	return {
		take: query.limit,
		skip: query.getSkip(),
	};
};

