import { Injectable } from "@nestjs/common";
import { ThemesRepository } from "./themes.repository";
import { Prisma } from "@prisma/client";
import { PaginationDto } from "src/shared/dto/pagination.dto";

@Injectable()
export class ThemesService {
	constructor(
		private readonly themeRepository: ThemesRepository
	) { }



	async createTheme(
		data: Prisma.ThemeCreateInput
	) {
		return await this.themeRepository.createTheme(data)
	}

	async updateTheme(
		themeId: string,
		update: Prisma.ThemeUpdateInput
	) {
		return await this.themeRepository.updateTheme(themeId, update)
	}

	async deleteTheme(themeId: string) {
		return await this.themeRepository.deleteTheme(themeId);
	}

	async getThemeByUniqueField<K extends keyof Prisma.ThemeWhereUniqueInput, V extends Prisma.ThemeWhereUniqueInput[K]>(
		key: K,
		value: V
	) {
		return await this.themeRepository.getThemeByUniqueField(key, value)
	}

	async getThemeByField<K extends keyof Prisma.ThemeWhereInput, V extends Prisma.ThemeWhereInput[K]>(
		key: K,
		value: V
	) {
		return await this.themeRepository.getThemeByField(key, value)
	}

	async getAllTheme(where: Prisma.ThemeWhereInput, pagination: PaginationDto) {
		return await this.themeRepository.getAllTheme(
			where,
			pagination
		)

	}

	async searchInAllThemes(search: string, pagination: PaginationDto, where: Prisma.ThemeWhereInput) { // Define a filter that will match the search term across the desired fields
		return await this.themeRepository.searchInAllThemes(search, pagination, where)
	}
}
