// Rebase require directory
requirejs.config({
	baseUrl: "lib",
	paths: {
		activity: "../js"
	}
});

// Vue main app
var app = new Vue({
	el: '#app',
	components: {
		'pawn': Pawn
	},
	data: {
		currentenv: null,
		displayText: '',
		pawns: [],
		SugarL10n: null,
		l10n: {
			stringAddPawn: '',
			stringTutoExplainTitle: '',
			stringTutoExplainContent: '',
			stringTutoAddTitle: '',
			stringTutoAddContent: '',
			stringTutoBackgroundTitle: '',
			stringTutoBackgroundContent: '',
		},
		SugarPresence: null,
	},
	mounted:function(){
		this.SugarL10n = this.$refs.SugarL10n;
		this.SugarPresence = this.$refs.SugarPresence;
	},
	methods: {
		initialized: function() {
			this.currentenv = this.$refs.SugarActivity.getEnvironment();
		},
		localized: function() {
			this.displayText = this.SugarL10n.get("Hello", { name: this.currentenv.user.name });
			this.SugarL10n.localize(this.l10n)
		},
		onAddClick: function(event) {
			for(var i=0;i<event.count;i++) {
				this.pawns.push(this.currentenv.user.colorvalue);
				this.displayText = this.SugarL10n.get("Played", { name: this.currentenv.user.name });
				if (this.SugarPresence.isShared()) {
					var message = {
						user: this.SugarPresence.getUserInfo(),
						content: {
							action: 'update',
							data: this.currentenv.user.colorvalue
						}
					}
					this.SugarPresence.sendMessage(message)
				}
			}
		},
		onStop:function() {
			var context = {
				pawns: this.pawns
			}
			this.$refs.SugarJournal.saveData(context);
		},
		onJournalNewInstance: function() {
			console.log("New instance")
		},
		onJournalDataLoaded: function(data, metadata) {
			console.log("Existing instance")
			this.pawns = data.pawns;
		},
		onJournalLoadError: function(error) {
			console.log("Error loading from journal")
		},
		onJournalSharedInstance: function() {
			console.log("Shared instance")
		},
		onNetworkDataReceived(msg) {
			switch(msg.content.action) {
				case 'init': 
					this.pawns = msg.content.data;
					break;
				case 'update':
					this.pawns.push(msg.content.data)
					this.displayText = this.SugarL10n.get("Played", { name: msg.user.name });
					break;
			}
		},
		onNetworkUserChanged(msg) {
			if(this.SugarPresence.isHost) {
				this.SugarPresence.sendMessage({
					user: this.SugarPresence.getUserInfo(),
					content: {
						action: 'init',
						data: this.pawns
					}
				})
			}
		},
		insertBackground:function() {
			var filters = [
				{mimetype: 'image/png'},
				{mimetype: 'image/jpeg'}
			];
			this.$refs.SugarJournal.insertFromJournal(filters)
			.then(function(data, metadata) {
				document.getElementById("app").style.backgroundImage = `url(${data})`;
			})
		},
		onHelp: function () {
			var steps = [
				{
					element: "",
					orphan: true,
					placement: "bottom",
					title: this.l10n.stringTutoExplainTitle,
					content: this.l10n.stringTutoExplainContent
				},
				{
					element: "#add-button",
					placement: "right",
					title: this.l10n.stringTutoAddTitle,
					content: this.l10n.stringTutoAddContent
				},
				{
					element: "#insert-button",
					placement: "bottom",
					title: this.l10n.stringTutoBackgroundTitle,
					content: this.l10n.stringTutoBackgroundContent
				}
			];
			this.$refs.SugarTutorial.show(steps);
		},
	}
});
