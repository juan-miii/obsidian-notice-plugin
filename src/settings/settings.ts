import { App, PluginSettingTab, Setting } from "obsidian";

import NoticePlugin from "src/main"

import { ObjectKeys } from "src/utils/utils";


/**
 * Interface representing the settings of the NoticePlugin.
 *
 * @interface
 * @since 1.0.0
 * @version 1.0.0
 */
export interface NoticePluginSettings extends ObjectKeys {

  /**
   * The delay in seconds before hiding any notice.
   *
   * @type {number}
   * @since 1.0.0
   * @default 5
   */
  delayInSeconds: number;
}

/**
 * Default settings for the NoticePlugin.
 *
 * @constant
 * @type {Partial<NoticePluginSettings>}
 * @since 1.0.0
 */
export const DEFAULT_NOTICE_PLUGIN_SETTINGS: Partial<NoticePluginSettings> = {
  delayInSeconds : 5,
}

/**
 * Represents a settings tab for configuring the NoticePlugin.
 *
 * This tab provides options to adjust settings related to notice display and behavior.
 *
 * @class
 * @extends PluginSettingTab
 * @since 1.0.0
 */
export class NoticePluginSettingTab extends PluginSettingTab {
  
  /**
   * NoticePlugin object.
   *
   * @type {NoticePlugin}
   * @since 1.0.0
   */
  plugin: NoticePlugin;
  
  constructor(app: App, plugin: NoticePlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    /**
     * Setting for the delayInSeconds configuration.
     */
    new Setting(containerEl)
      .setName('Delay')
      .setDesc('Delay before hiding the startup time notice (in seconds)')
      .addSlider((slider) => slider
        .setLimits(0, 60, 1)
        .setValue(this.plugin.settings.delayInSeconds)
        .setDynamicTooltip()
        .onChange((value) => {
          this.plugin.settings.delayInSeconds = value;
          this.plugin.saveSettings();
        }))
      .then((settingEl) => this.addResetButton(settingEl, 'delayInSeconds'));
  }

  /**
   * Adds a reset button to a setting element, allowing users to reset the setting to its default value.
   *
   * @method
   * @memberof NoticePluginSettingTab
   * @since 1.0.0
   *
   * @param {Setting} settingEl - The setting element to which the reset button will be added.
   * @param {keyof NoticePluginSettings} settingKey - The key of the setting to reset.
   * @param {boolean} [refreshView=true] - A flag indicating whether to refresh the view after resetting the setting.
   * @returns {void}
   */
  addResetButton(settingEl: Setting, settingKey: keyof NoticePluginSettings, refreshView = true) : void {
    settingEl
      .addExtraButton((button) => button
        .setIcon('reset')
        .setTooltip('Reset to default')
        .onClick(() => {
          const defaultValue = DEFAULT_NOTICE_PLUGIN_SETTINGS[settingKey];
          if (defaultValue !== undefined) {
            this.plugin.settings[settingKey] = defaultValue;
            this.plugin.saveSettings();
            if(refreshView) { this.display(); }
          }
        }))
  }
  
  
}
