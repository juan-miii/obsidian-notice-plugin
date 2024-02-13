import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

// Remember to rename these classes and interfaces!
import { DEFAULT_NOTICE_PLUGIN_SETTINGS, NoticePluginSettings, NoticePluginSettingTab } from 'src/settings/settings';

export default class NoticePlugin extends Plugin {
  settings: NoticePluginSettings;

  async onload() {
    await this.loadSettings();

    this.addSettingTab(new NoticePluginSettingTab(this.app, this));
		console.log('Added Settings Tab.');

		// controls app readyness
    this.app.workspace.onLayoutReady(() => {
			console.log('Layout ready.');
			if (this.settings.onlyStartup) {
				this.removePluginSetupNotices();
			} else {
				this.removeAllNotices();
			}
		});
		
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_NOTICE_PLUGIN_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }


	removeAllNotices() {
		console.log('Enters function removeAllNotices.');
		
			const notices = document.querySelectorAll('.notice');
			// Si existen, los elimina
			if (notices) {
				setTimeout(() => {
					console.log('There are notices.');
					notices.forEach(notice => notice.remove());
				}, this.settings.delayInSeconds * 1000);
			}
		
		
		console.log('End function removeAllNotices.');
	}
	
	/**
	 * Método para eliminar notificaciones específicas en Obsidian.
	 *
	 * @returns {void} No devuelve ningún valor.
	 *
	 * @remarks
	 * Este método se encarga de eliminar todas las notificaciones que contienen el texto 'plugin setup'.
	 * Se ejecuta al cargar la página y cada vez que se detecta un cambio en el DOM.
	 */
	removePluginSetupNotices(): void {
		console.log('Enters function removePluginSetupNotices.');
			// Busca todos los divs con la clase 'notice'
			const notices = document.querySelectorAll('.notice');
			console.log('There are notices.');
			// Si existen, verifica si el texto de la notificación contiene 'plugin setup'
			if (notices) {
				notices.forEach(notice => {
					if (notice.textContent && notice.textContent.includes('plugin setup')) {
						setTimeout(() => {

							console.log('Target setup found.');
							// Si es así, elimina la notificación
							notice.remove();
						}, this.settings.delayInSeconds * 1000);

					}
				});
			}
	
		console.log('End function removePluginSetupNotices.');
	}
	


}

