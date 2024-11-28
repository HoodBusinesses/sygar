import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { DatabseService } from "src/lib/databse/datbase.service";
import { PaginationDto } from "src/shared/dto/pagination.dto";
import { getPaginationQuery, getPaginationResponse } from "src/shared/pagination";

@Injectable()
export class ThemesRepository {

	constructor(
		private readonly dbService: DatabseService
	) { }

	async createTheme(
		data: Prisma.ThemeCreateInput
	) {
		return await this.dbService.theme.create({ data })
	}

	async updateTheme(
		themeId: string,
		update: Prisma.ThemeUpdateInput
	) {
		return await this.dbService.theme.update({
			where: { id: themeId },
			data: update
		})
	}

	async deleteTheme(themeId: string) {
		return await this.dbService.theme.delete({ where: { id: themeId } })
	}

	async getThemeByUniqueField<K extends keyof Prisma.ThemeWhereUniqueInput, V extends Prisma.ThemeWhereUniqueInput[K]>(
		key: K,
		value: V
	) {
		return await this.dbService.theme.findUnique({
			where: {
				[key]: value
			} as any
		})
	}

	async getThemeByField<K extends keyof Prisma.ThemeWhereInput, V extends Prisma.ThemeWhereInput[K]>(
		key: K,
		value: V
	) {
		return await this.dbService.theme.findFirst({
			where: {
				[key]: value
			}
		})
	}

	async getAllTheme(where: Prisma.ThemeWhereInput, pagination: PaginationDto) {

		// Fetch users based on the filter and handle pagination
		const [count, themes] = await Promise.all([
			this.dbService.theme.count({ where }),
			this.dbService.theme.findMany({
				where,
				...(getPaginationQuery(pagination))
			})]);

		return {
			themes,
			...(getPaginationResponse(pagination, count))
		}
	}

	async searchInAllThemes(search: string, pagination: PaginationDto, where: Prisma.ThemeWhereInput) { // Define a filter that will match the search term across the desired fields
		const filter: Prisma.ThemeWhereInput = {
			AND: [
				{
					OR: [
						{ name: { contains: search, mode: 'insensitive' } },
					]
				}, (where ? where : {})]
		};

		// Fetch users based on the filter and handle pagination
		const [count, themes] = await Promise.all([
			this.dbService.theme.count({ where: filter }),
			this.dbService.theme.findMany({
				where: filter,
				...(getPaginationQuery(pagination))
			})]);

		return {
			themes,
			...(getPaginationResponse(pagination, count))
		}
	}
}
