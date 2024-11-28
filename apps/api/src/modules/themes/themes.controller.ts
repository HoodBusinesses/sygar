import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { CreateThemeDto } from "./dto/create-theme.dto";
import { ThemesService } from "./themes.service";
import { UpdateThemeDto } from "./dto/update-theme.dto";
import { PaginationDto } from "src/shared/dto/pagination.dto";

@Controller('themes')
export class ThemesController {

	constructor(
		private readonly themeService: ThemesService
	) { }


	@Post()
	async createTheme(@Body() dto: CreateThemeDto) {
		return await this.themeService.createTheme({
			name: dto.name,
			year: +dto.year,
			price: +dto.price
		})
	}

	@Put(":themeId")
	async updateOrganization(
		@Body() dto: UpdateThemeDto,
		@Param("themeId") themeId: string
	) {
		return await this.themeService.updateTheme(themeId, {
			...(dto.name ? { name: dto.name } : {}),
			...(dto.year ? { year: +dto.year } : {}),
			...(dto.price ? { price: +dto.price } : {})

		})
	}

	@Delete(":themeId")
	async deleteTheme(
		@Param("themeId") themeId: string

	) {
		return await this.themeService.deleteTheme(themeId);
	}


	@Get(":themeId")
	async getTheme(
		@Param("themeId") themeId: string

	) {
		return await this.themeService.getThemeByUniqueField('id', themeId);
	}


	@Get()
	async getAllTheme(
		@Query() query: any

	) {
		return await (
			query.search ? this.themeService.searchInAllThemes(
				query.search,
				new PaginationDto(+(query.page || 1), +(query.limit || 50)),
				{}
			) : this.themeService.getAllTheme({},
				new PaginationDto(+(query.page || 1), +(query.limit || 50)),
			)
		)
	}
}
