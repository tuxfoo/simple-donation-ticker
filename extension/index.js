'use strict';

module.exports = function (nodecg) {
	// A list of tippers totals
	nodecg.Replicant('tipTotals', { defaultValue: []});
	nodecg.Replicant('recentTips', { defaultValue: []});
	nodecg.Replicant('settings', { defaultValue: {minAmount: 1, donorColour: "#9B91FF", textColour: "#32C3A6", currency: "suffix", recent: 15, currencyName: "LBC", mode: "top", fontSize: "36", font: "'Open Sans'"}});
  nodecg.Replicant('manual', { defaultValue: {}, persistent: false });
	const router = nodecg.Router();
	var tipTotals = nodecg.Replicant('tipTotals');
	const recentTips = nodecg.Replicant('recentTips');
	const settings = nodecg.Replicant('settings');
	const manual = nodecg.Replicant('manual');

	function addTotal(username, amount) {
		const sorted = [...tipTotals.value];
		var tipExists = sorted.map(
		function(e) {
			return e.name
		}).indexOf(username);
		if (tipExists != -1) {
				sorted[tipExists].amount = parseFloat(sorted[tipExists].amount) + parseFloat(amount);
		}
		else {
			sorted.push({name: username, amount: amount});
		}
		sorted.sort( function (a, b) { return parseFloat(b.amount) - parseFloat(a.amount) } );
		tipTotals.value = sorted;
	}

	function addRecent(username, amount) {
		while ( recentTips.value.length > settings.value.recent ) {
			recentTips.shift();
		}
		if ( amount > settings.value.minAmount ) {
			recentTips.value.push({name: username, amount: amount});
		}
		addTotal(username, amount);
	}

	manual.on('change', v => {
		if (v.name && v.amount) {
			nodecg.log.info('Manual Change');
			addRecent(v.name, v.amount);
		}
	});

	router.post('/ticker', (req, res) => {
			const name = req.body.name;
			const amount = req.body.amount;
			res.send("Donation will be added to ticker if it meets requirements");
			addRecent(name, amount);
	});

		nodecg.mount('/simple-donation-ticker', router); // The route '/my-bundle/customroute` is now available

};
