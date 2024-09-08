
import { Injectable } from "@nestjs/common";

@Injectable()
export class DatabaseConstants {
	private isProduction: boolean;
	private tableSuffix: string;
	private projectName: string;

	constructor() {
		this.projectName = 'SYGAR';
		this.isProduction = process.env.NODE_ENV === 'Prod';
		this.tableSuffix = this.isProduction ? 'Prod' : 'Staging';
	}

	getTable(name: string) {
		return `${this.projectName}_${name}_${this.tableSuffix.toUpperCase()}`;
	}

  getPrimaryKey(name: string) {
    return `${name.toUpperCase()}_${this.tableSuffix.toUpperCase()}`;
  }

  getSortKey(id: string) {
    return `${this.projectName}_${id}_${this.tableSuffix.toUpperCase()}_SECRET`;
  }
}