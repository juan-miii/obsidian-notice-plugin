import { App, PluginSettingTab, Setting } from "obsidian";
import NoticePlugin from "src/main"


export interface NoticePluginSettings {
  delayInSeconds: number;
  onlyStartup: boolean;
}

export const DEFAULT_NOTICE_PLUGIN_SETTINGS: Partial<NoticePluginSettings> = {
  delayInSeconds: 5,
  onlyStartup: true,
}

export class NoticePluginSettingTab extends PluginSettingTab {
  plugin: NoticePlugin;

  constructor(app: App, plugin: NoticePlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    let { containerEl } = this;
    containerEl.empty();

    new Setting(containerEl)
      .setName('Delay')
      .setDesc('Delay before hiding the startup time notice (in seconds)')
      .addSlider(slider => slider
        .setLimits(1, 60, 1)
        .setValue(this.plugin.settings.delayInSeconds)
        .onChange(async (value) => {
          this.plugin.settings.delayInSeconds = value;
          await this.plugin.saveSettings();
        }));

  }
}
