import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { DatabseService } from "src/lib/databse/datbase.service";
import { PaginationDto } from "src/shared/dto/pagination.dto";
import { getPaginationQuery, getPaginationResponse } from "src/shared/pagination";

@Injectable()
export class GroupDateRepository {

	constructor(
		private readonly dbService: DatabseService
	) { }

	async createDate(
		data: Prisma.GroupDateCreateInput
	) {
		return await this.dbService.groupDate.create({ data })
	}

	async updateDate(
		dateId: string,
		update: Prisma.GroupDateUpdateInput
	) {
		return await this.dbService.groupDate.update({
			where: { id: dateId },
			data: update
		})
	}

	async deleteDate(dateId: string) {
		return await this.dbService.groupDate.delete({ where: { id: dateId } })
	}

	async getDateByUniqueField<K extends keyof Prisma.GroupDateWhereUniqueInput, V extends Prisma.GroupDateWhereUniqueInput[K]>(
		key: K,
		value: V
	) {
		return await this.dbService.groupDate.findUnique({
			where: {
				[key]: value
			} as any
		})
	}

	async getDateByField<K extends keyof Prisma.GroupDateWhereInput, V extends Prisma.GroupDateWhereInput[K]>(
		key: K,
		value: V
	) {
		return await this.dbService.groupDate.findFirst({
			where: {
				[key]: value
			}
		})
	}

	async getAllDates(where: Prisma.GroupDateWhereInput, pagination: PaginationDto) {

		console.log(where)
		// Fetch users based on the filter and handle pagination
		const [count, dates] = await Promise.all([
			this.dbService.groupDate.count({ where }),
			this.dbService.groupDate.findMany({
				where,
				...(getPaginationQuery(pagination))
			})]);

		return {
			dates,
			...(getPaginationResponse(pagination, count))
		}
	}
}
