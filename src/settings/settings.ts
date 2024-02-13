import { App, PluginSettingTab, Setting } from "obsidian";
import DashboardPlugin from "src/main";
import es from 'src/locales/es';
import en from 'src/locales/en';



export interface DashboardSettings {
	mySetting: string;
  language: 'English' | 'Español';
}

export const DEFAULT_SETTINGS: Partial<DashboardSettings> = {
	mySetting: 'default',
  language: 'English'
}




export class DashboardSettingTab extends PluginSettingTab {
	plugin: DashboardPlugin;
  strings: typeof es | typeof en;

	constructor(app: App, plugin: DashboardPlugin) {
		super(app, plugin);
		this.plugin = plugin;
		this.strings = this.plugin.settings.language === 'Español' ? es : en;
	}

  display(): void {
    const { containerEl } = this;
    const a = app.vault.configDir.localeCompare()
    containerEl.empty();

    let modified = false;

    new Setting(containerEl)
      .setName('DEMO Setting')
      .setDesc('enter info')
      .addText(text =>
        text
          .setPlaceholder('Enter your secret')
          .setValue(this.plugin.settings.mySetting)
          .onChange(async (value) => {
            modified = true;
            this.plugin.settings.mySetting = value;
          })
          .inputEl.addEventListener('focus', (event) => {
            if(event.target instanceof HTMLInputElement && !modified) {
              event.target.value = '';
            } else if (event.target instanceof HTMLInputElement) {
              event.target.value = this.plugin.settings.mySetting;
            }
          })
      )
      .addButton(button =>
        button
          .setButtonText('Update')
          .onClick(async () => {
            modified = false;
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName('Language')
      .setDesc('Set language or keep app default')
      .addDropdown(dropdown => {
        dropdown
          .addOption('Español', 'Español')
          .addOption('English', 'English')
          // TODO: as today, sys refers to DEFAULT value, but should use app default on correct implementation.
          //.addOption('System', 'App language')
          .setValue(this.plugin.settings.language)
          .onChange(async (value) => {
            this.plugin.settings.language = value as 'Español' | 'English';
            await this.plugin.saveSettings();
          });
      })
  }
}
