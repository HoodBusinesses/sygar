import { readFile } from "fs/promises";
import { join } from "path";
import { IsServerless } from "src/shared/utils/infra";

export class TemplatesService {


	async getTemplate(template: string, changes?: object): Promise<string> {
		// TODO: make teplates path ENV for serverless ENV and the Iaas Env
		const templatePath = join(
			process.cwd(),
			IsServerless() ? 'static/' : 'src/templates',
			`${template}.html`
		);
		let htmlTemplate = await readFile(templatePath, 'utf8');

		Object.entries(changes!).forEach(([k, v]) => {
			console.log(k, v)
			htmlTemplate = htmlTemplate.replace(k, v)
		})
		return htmlTemplate
	}
}
