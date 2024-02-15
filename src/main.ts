//import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

import { Plugin } from 'obsidian';

import { DEFAULT_NOTICE_PLUGIN_SETTINGS, NoticePluginSettings, NoticePluginSettingTab } from 'src/settings/settings';

/**
 * Represents a notice handling plugin for Obsidian.
 *
 * This plugin extends the base functionality provided by Obsidian and offers
 * features related to managing notices within the application.
 *
 * @class
 * @extends Plugin
 * @since 1.0.0
 * @version 1.0.0
 * @author juan-mii
 */
export default class NoticePlugin extends Plugin {

  /**
   * The settings for the NoticePlugin.
   *
   * @type {NoticePluginSettings}
   * @since 1.0.0
   */
  settings: NoticePluginSettings;


  async onload() {
    await this.loadSettings();
    this.addSettingTab(new NoticePluginSettingTab(this.app, this));
    this.app.workspace.onLayoutReady(() => {
			this.removeStartupNotices();
		});
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_NOTICE_PLUGIN_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
	
	/**
	 * Removes notices on load DOM after a specified delay.
	 *
	 * @memberof NoticePlugin
	 * @method
	 * @since 1.0.0
	 *
	 * @returns {void}
	 */
	removeStartupNotices(): void {
		const notices = document.querySelectorAll('.notice');
		if (notices) {
			setTimeout(() => {
				notices.forEach(notice => notice.remove());
			}, this.settings.delayInSeconds * 1000);
		}
	}

	
}
