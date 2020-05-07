jQuery(function($)
{
	var cdr_all_height = 0;
	var t_start_partiel = 0;
	var t_start_total = 0;
	var t_last_calcul = 0;
	var t_last_ecart = 0;
	var c_cadran = $('.cdr');
	var c_export = $('#cdr-exp');
	var tx_export = $('#t-exp').text();
	var tx_del = $('#t-del').text();
	var c_tour = $('.chr-cpt div div');
	var c_tour_last = $('.chr-cpt-lst div div');
	var c_partiel = new Array($('.chr-prt div div.h_1'), $('.chr-prt div div.h_0'), $('.chr-prt div div.m_1'), $('.chr-prt div div.m_0'), $('.chr-prt div div.s_1'), $('.chr-prt div div.s_0'), $('.chr-prt div div.c_2'), $('.chr-prt div div.c_1'), $('.chr-prt div div.c_0'));
	var c_last = new Array($('.chr-lst div div.h_1'), $('.chr-lst div div.h_0'), $('.chr-lst div div.m_1'), $('.chr-lst div div.m_0'), $('.chr-lst div div.s_1'), $('.chr-lst div div.s_0'), $('.chr-lst div div.c_2'), $('.chr-lst div div.c_1'), $('.chr-lst div div.c_0'));
	var c_total = new Array($('.chr-tot div div.h_1'), $('.chr-tot div div.h_0'), $('.chr-tot div div.m_1'), $('.chr-tot div div.m_0'), $('.chr-tot div div.s_1'), $('.chr-tot div div.s_0'), $('.chr-tot div div.c_2'), $('.chr-tot div div.c_1'), $('.chr-tot div div.c_0'));
	var a_unite_total = new Array(1, 1, 1, 1, 1, 1, 1, 1, 1);
	var a_unite_partiel = new Array(1, 1, 1, 1, 1, 1, 1, 1, 1);
	var a_unite_last = new Array(1, 1, 1, 1, 1, 1, 1, 1, 1);
	var a_time_partiel = new Array();
	var a_time_last = new Array();
	var a_time_total = new Array();
	var is_intermediaires = ($('.chr-prt').length) ? true : false;
	var is_arrivees = (!is_intermediaires && $('.chr-cpt').length) ? true : false;
	var o_to = false;
	var action = 0;
	var unique_id = 1;
	var ls_name = is_intermediaires ? 'CT' : ( is_arrivees ? 'Ch' : 'Ar');
	var s_title = document.title;
	var scroll_pos = -1;

	if (localStorage[ls_name + 'id'] != null && localStorage[ls_name + 'dt'] != null)
	{
		if (localStorage[ls_name + 'ac'] != null)
		{
			action = parseInt(localStorage[ls_name + 'ac']);
		}
		if (localStorage[ls_name + 'lc'] != null)
		{
			t_last_calcul = parseInt(localStorage[ls_name + 'lc']);
		}
		t_start_total = parseInt(localStorage[ls_name + 'dt']);
		if (localStorage[ls_name + 'dp'] != null)
		{
			t_start_partiel = parseInt(localStorage[ls_name + 'dp']);
		}
		if (action != 1)
		{
			t_reprise = new Date().getTime();
			t_start_total = t_reprise - t_last_calcul + t_start_total;
			t_start_partiel = t_reprise - t_last_calcul + t_start_partiel;
			t_last_calcul = t_reprise;
		}
		var unique_id_max = parseInt(localStorage[ls_name + 'id']);

		for ( unique_id = 1; unique_id < unique_id_max; )
		{
			if (localStorage[ls_name + 't' + unique_id] != null)
			{
				t_last_ecart_total = parseInt(localStorage[ls_name + 't' + unique_id]);
				if (localStorage[ls_name + 'p' + unique_id] != null)
				{
					t_last_ecart_partiel = parseInt(localStorage[ls_name + 'p' + unique_id]);
				}
				actualise_liste();
			}
			else
			{
				unique_id++;
			}
		}
		// ls_name + 't' + unique_id : t_last_ecart_total
		// ls_name + 'p' + unique_id : t_last_ecart_partiel
		// ls_name + 'i' + unique_id : commentaire
		// ls_name + 'dt' : t_start_total);
		// ls_name + 'dp' : t_start_partiel);
		// ls_name + 'ac' : action);
	}

	actualise_bouton();

	if (action != 1)
	{
		unique_id--;
	}

	actualise_chrono(true, t_last_calcul);

	actualise_compteur();

	if (action != 1)
	{
		unique_id++;
	}
	function actualise_bouton()
	{
		if (action == 0)// demarrer
		{
			if (!$('#cdr-start').is(':visible'))
			{
				$('#cdr-start').show();

				$('#bt-start').unbind().click(function()
				{
					start_cmd();
				});
			}
		}
		else
		{
			$('#cdr-start').hide();
		}
		if (is_intermediaires)
		{
			if (action == 1 || action == 2)
			{
				if (!$('#cdr-mem').is(':visible'))
				{
					$('#cdr-mem').show();

					$('#bt-mem').unbind().click(function()
					{
						memoire_cmd();
					});
				}
			}
			else
			{
				$('#cdr-mem').hide();
			}
		}
		else
		if (!is_arrivees)
		{
			if (action == 2)
			{
				if (!$('#cdr-restart').is(':visible'))
				{
					$('#cdr-restart').show();

					$('#bt-restart').unbind().click(function()
					{
						start_cmd();
					});
				}
			}
			else
			{
				$('#cdr-restart').hide();
			}
		}
		if (action == 1)// Arreter
		{
			if (is_arrivees)
			{
				if (!$('#cdr-memorise').is(':visible'))
				{
					$('#cdr-memorise').show();

					$('#bt-memorise').unbind().click(function()
					{
						memorise_cmd();
					});
				}
			}

			if (!$('#cdr-stop').is(':visible'))
			{
				$('#cdr-stop').show();

				$('#bt-stop').unbind().click(function()
				{
					stop_cmd();
				});
			}
		}
		else
		{
			if (is_arrivees)
			{
				$('#cdr-memorise').hide();
			}

			$('#cdr-stop').hide();
		}
		if (action == 2)
		{
			if (!$('#cdr-reprise').is(':visible'))
			{
				$('#cdr-reprise').show();
				$('#bt-reprise').unbind().click(function()
				{
					reprise_cmd();
				});
			}
		}
		else
		{
			$('#cdr-reprise').hide();
		}
		if (action == 2)
		{
			if (!$('#cdr-reset').is(':visible'))
			{
				$('#cdr-reset').show();
				$('#bt-reset').unbind().click(function()
				{
					reset_cmd();
				});
			}
		}
		else
		{
			$('#cdr-reset').hide();
		}

		if (cdr_all_height < $('#cdr-all').height())
		{
			cdr_all_height = $('#cdr-all').height();

			$('#cdr-all').css('min-height', cdr_all_height);
		}
	}

	function actualise_liste()
	{
		if (unique_id <= 1 && t_start_total == 0)
		{
			c_export.html('');
		}
		else
		{
			if (!$('#bt-export').length)
			{
				c_export.html('<h4>' + tx_export + '</h4><div class="lst-mem"></div><input type="submit" name="exporter" value="' + tx_export + '" class="f-sbm bt_export" id="bt-export"><div class="export-memoire"></div>');
				$('#bt-export').unbind().click(function()
				{
					$('.export-memoire').html(exporter_html());
				});
			}
			a_mt_total = decompose_time(t_last_ecart_total);
			a_time_total[unique_id] = '' + a_mt_total[0] + a_mt_total[1] + ':' + a_mt_total[2] + a_mt_total[3] + ':' + a_mt_total[4] + a_mt_total[5] + '.' + a_mt_total[6] + a_mt_total[7] + a_mt_total[8];
			var __text_comment = (localStorage[ls_name + 't' + unique_id] != null && localStorage[ls_name + 'i' + unique_id] != null) ? localStorage[ls_name + 'i' + unique_id] : '';
			var __html = '<div class="lgn-mem" id="l-m-' + unique_id + '"><input name="texte" type="text" value="' + __text_comment + '" placeholder="Commentaire" size="30" maxlength="30" class="f-txt" id="i' + unique_id + '">';
			if (is_intermediaires)
			{
				a_mt_partiel = decompose_time(t_last_ecart_partiel);
				a_time_partiel[unique_id] = '' + a_mt_partiel[0] + a_mt_partiel[1] + ':' + a_mt_partiel[2] + a_mt_partiel[3] + ':' + a_mt_partiel[4] + a_mt_partiel[5] + '.' + a_mt_partiel[6] + a_mt_partiel[7] + a_mt_partiel[8];
				__html += '<div class="mem-prt">' + htmlTime(a_mt_partiel) + '</div>';
			}
			__html += '<div class="mem-cpt"><div><div class="grd">' + unique_id + '</div></div></div>';
			__html += '<div class="mem-ttl">' + htmlTime(a_mt_total) + '</div><span class="corbeille">';
			__html += '<input type="submit" name="supprimer" value="' + tx_del + '" class="f-sbm bt_export" id="bt-del' + unique_id + '">';
			__html += '</div>';
			$('.lst-mem').append(__html);
			localStorage.setItem(ls_name + 't' + unique_id, t_last_ecart_total);
			if (is_intermediaires)
			{
				localStorage.setItem(ls_name + 'p' + unique_id, t_last_ecart_partiel);
			}
			$('#l-m-' + unique_id + ' .f-txt').keyup(function()
			{
				localStorage.setItem(ls_name + $(this).attr('id'), $(this).val());
			});
			$('#bt-del' + unique_id).unbind().click(function()
			{
				var __unique_id = $(this).attr('id').replace('bt-del', '');

				localStorage.removeItem(ls_name + 't' + __unique_id);

				$('#' + $(this).attr("id")).parent().parent('.lgn-mem').hide(500, function()
				{
					$(this).remove();
				});
			});
			unique_id++;
			localStorage.setItem(ls_name + 'id', unique_id);
			if ($('#ta-export').length)
			{
				$('.export-memoire').html(exporter_html());
			}
		}
	}

	function delete_liste()
	{
		unique_id--;
		$('#l-m-' + unique_id).hide(500, function()
		{
			$(this).remove();
		});
	}

	function htmlTime(a_mt)
	{
		var a_nul = true;
		var __html = '<div>';
		for (var __k in a_mt)
		{
			if (a_mt[__k] > 0)
			{
				a_nul = false;
			}
			if (__k > 5)
			{
				__html += '<div class="pti" style="color: rgb(' + ( a_nul ? '160, 160, 160' : '80, 80, 80') + ')">' + a_mt[__k] + '</div>';
			}
			else
			{
				__html += '<div class="grd" style="color: rgb(' + ( a_nul ? '128, 128, 128' : '0, 0, 0') + ')">' + a_mt[__k] + '</div>';
			}
			switch(__k)
			{
				case '1':
				case '3':
					__html += '<div class="grd">:</div>';
					break;
				case '5':
					__html += '<div class="grd">.</div>';
			}
		}
		__html += '</div>';
		return __html;
	}

	function actualise_compteur()
	{
		if (t_start_total == 0 || action == 0)
		{
			c_export.html('');
			$(c_tour).text('0');
			$(c_tour).css("color", '#AAA');

			$('h6.chr-ttr-partiel #num-tour').text('');
		}
		else
		{
			$(c_tour).text(unique_id);
			$(c_tour).css("color", '#333');

			$('h6.chr-ttr-partiel #num-tour').text(unique_id);
		}

		if (is_arrivees || is_intermediaires)
		{
			var __last_id = 0;

			for ( __id = unique_id - 1; __id > 0; __id--)
			{
				if (localStorage[ls_name + 't' + __id] != null)
				{
					__last_id = __id;
					break;
				}
			}

			$(c_tour_last).text(__last_id);

			if (__last_id == 0)
			{
				$(c_tour_last).css("color", '#AAA');
				$('h6.chr-ttr-partiel #num-tour-last').text('');
			}
			else
			{
				$(c_tour_last).css("color", '#333');
				$('h6.chr-ttr-partiel #num-tour-last').text(__last_id);
			}
		}
	}

	function actualise_chrono(_init, _t_last_calcul)
	{
		if (_init == undefined)
		{
			var _init = false;
		}
		t_last_calcul = (_t_last_calcul != undefined && _t_last_calcul != 0) ? _t_last_calcul : new Date().getTime();
		if (t_start_total == 0)
		{
			t_start_total = t_start_partiel = t_last_calcul;
		}
		else
		if (t_start_partiel == 0)
		{
			t_start_partiel = t_last_calcul;
		}
		if (t_last_calcul < t_start_total)
		{
			t_start_total = t_start_partiel = t_last_calcul;
		}
		else
		if (t_last_calcul < t_start_partiel)
		{
			t_start_partiel = t_last_calcul;
		}
		t_last_ecart_total = t_last_calcul - t_start_total;
		t_last_ecart_partiel = t_last_calcul - t_start_partiel;
		a_new_unite_total = decompose_time(t_last_ecart_total);
		a_new_unite_partiel = decompose_time(t_last_ecart_partiel);
		if (action == 0 || action == 2)
		{
			document.title = s_title;
		}
		else
		if (a_new_unite_partiel[5] != a_unite_total[5])
		{
			document.title = ('' + a_new_unite_total[0] + a_new_unite_total[1] + ':' + a_new_unite_total[2] + a_new_unite_total[3] + ':' + a_new_unite_total[4] + a_new_unite_total[5]);
		}

		if (is_arrivees && _init)
		{
			var __t_last_ecart_last = 0;

			for ( __id = unique_id - 1; __id > 0; __id--)
			{
				if (localStorage[ls_name + 't' + __id] != null)
				{
					__t_last_ecart_last = parseInt(localStorage[ls_name + 't' + __id]);
					break;
				}
			}

			a_new_unite_last = decompose_time(__t_last_ecart_last);
		}
		else
		if (is_intermediaires && _init)
		{
			var __t_last_ecart_last = 0;

			for ( __id = unique_id - 1; __id > 0; __id--)
			{
				if (localStorage[ls_name + 't' + __id] != null)
				{
					__t_last_ecart_last = parseInt(localStorage[ls_name + 'p' + __id]);
					break;
				}
			}

			a_new_unite_last = decompose_time(__t_last_ecart_last);
		}
		var __nul_total = true;
		var __nul_partiel = true;
		var __nul_last = true;
		for (var __k in a_new_unite_total)
		{
			if (a_new_unite_total[__k] > 0)
			{
				__nul_total = false;
			}
			if (a_new_unite_total[__k] != a_unite_total[__k] || _init)
			{
				a_unite_total[__k] = a_new_unite_total[__k];
				c_total[__k].text(a_new_unite_total[__k]);
				c_total[__k].css("color", (__k > 5) ? (__nul_total) ? "#AAA" : "#555" : (__nul_total) ? "#888" : "#000");
			}
			if (is_intermediaires)
			{
				if (a_new_unite_partiel[__k])
				{
					__nul_partiel = false;
				}
				if (a_new_unite_partiel[__k] != a_unite_partiel[__k] || _init)
				{
					a_unite_partiel[__k] = a_new_unite_partiel[__k];
					c_partiel[__k].text(a_new_unite_partiel[__k]);
					c_partiel[__k].css("color", (__k > 5) ? (__nul_partiel) ? "#BBB" : "#555" : (__nul_partiel) ? "#888" : "#000");
				}
			}
			if ((is_arrivees || is_intermediaires) && _init)
			{
				if (a_new_unite_last[__k])
				{
					__nul_last = false;
				}
				if (a_new_unite_last[__k] != a_unite_last[__k] || _init)
				{
					a_unite_last[__k] = a_new_unite_last[__k];
					c_last[__k].text(a_new_unite_last[__k]);
					c_last[__k].css("color", (__k > 5) ? (__nul_last) ? "#BBB" : "#555" : (__nul_last) ? "#888" : "#000");
				}
			}
		}
		if (_init)
		{
			localStorage.setItem(ls_name + 'dt', t_start_total);
			if (is_intermediaires)
			{
				localStorage.setItem(ls_name + 'dp', t_start_partiel);
			}
			localStorage.setItem(ls_name + 'ac', action);
			localStorage.setItem(ls_name + 'lc', t_last_calcul);
			localStorage.setItem(ls_name + 'id', unique_id);
		}
		if (action == 1)
		{
			o_to = setTimeout(actualise_chrono, 10);
		}
	}


	$('.f-txt').focus(function()
	{
		$('.cdr-hlp').hide();
	});

	$('.f-txt').blur(function()
	{
		$('.cdr-hlp').show();
	});

	$(window).focus(function()
	{
		$('.cdr-hlp').show();
	}).blur(function()
	{
		$('.cdr-hlp').hide();
	});

	$(document).keydown(function(_e)
	{
		if ($('input').is(':focus'))
		{
			return;
		}
		if (_e.which == 32)
		{
			_e.preventDefault();

			switch (action)
			{
				case 0:
					start_cmd();
					break;
				case 1:
					if (is_intermediaires)
					{
						memoire_cmd();
					}
					else
					if (is_arrivees)
					{
						memorise_cmd();
					}
					else
					{
						stop_cmd();
					}
					break;
				case 2:
					if (is_intermediaires)
					{
						memoire_cmd();
					}
					else
					{
						reprise_cmd();
					}
			}
		}
		else
		if (_e.which == 48 || _e.which == 96)
		{
			if (action == 0 || action == 2)
			{
				_e.preventDefault();
				start_cmd();
			}
		}
		else
		if (_e.which == 49 || _e.which == 97)
		{
			if ((action == 1 || action == 2) && is_intermediaires)
			{
				_e.preventDefault();
				memoire_cmd();
			}
			if (action == 1 && is_arrivees)
			{
				_e.preventDefault();
				memorise_cmd();
			}
		}
		else
		if (_e.which == 50 || _e.which == 98)
		{
			if (action == 2)
			{
				_e.preventDefault();
				reprise_cmd();
			}
		}
		else
		if (_e.which == 222 || _e.which == 99)
		{
			if (action == 1)
			{
				_e.preventDefault();
				stop_cmd();
			}
		}

	});
	function decompose_time(_time)
	{
		var __max = 345600000;
		for (; ; )
		{
			if (_time < __max)
			{
				break;
			}
			_time -= __max;
		}
		var a_new_unite = new Array();
		a_new_unite[0] = Math.floor(_time / 36000000);
		_time -= a_new_unite[0] * 36000000;
		a_new_unite[1] = Math.floor(_time / 3600000);
		_time -= a_new_unite[1] * 3600000;
		a_new_unite[2] = Math.floor(_time / 600000);
		_time -= a_new_unite[2] * 600000;
		a_new_unite[3] = Math.floor(_time / 60000);
		_time -= a_new_unite[3] * 60000;
		a_new_unite[4] = Math.floor(_time / 10000);
		_time -= a_new_unite[4] * 10000;
		a_new_unite[5] = Math.floor(_time / 1000);
		_time -= a_new_unite[5] * 1000;
		a_new_unite[6] = Math.floor(_time / 100);
		_time -= a_new_unite[6] * 100;
		a_new_unite[7] = Math.floor(_time / 10);
		_time -= a_new_unite[7] * 10;
		a_new_unite[8] = _time;
		return a_new_unite;
	}

	function start_cmd()
	{
		action = 1;
		t_start_total = t_start_partiel = 0;
		actualise_bouton();
		actualise_chrono(true);
		actualise_compteur();
	}

	function stop_cmd()
	{
		action = 2;
		actualise_bouton();
		clearTimeout(o_to);
		actualise_chrono(true);
		actualise_liste(t_last_ecart);
	}

	function memoire_cmd()
	{
		if (action == 1)
		{
			actualise_bouton();
			clearTimeout(o_to);
			actualise_chrono(true);
			actualise_liste(t_last_ecart);
			actualise_compteur();
			t_start_partiel = t_last_calcul;
			actualise_chrono(true);
		}
		else
		{
			action = 1;
			actualise_bouton();
			clearTimeout(o_to);
			t_reprise = new Date().getTime();
			t_start_total = t_reprise - t_last_calcul + t_start_total;
			t_start_partiel = t_reprise;
			actualise_chrono(true);
			actualise_compteur();
		}
	}

	function reprise_cmd()
	{
		action = 1;
		actualise_bouton();
		t_reprise = new Date().getTime();
		t_start_total = t_reprise - t_last_calcul + t_start_total;
		t_start_partiel = t_reprise - t_last_calcul + t_start_partiel;
		delete_liste();
		actualise_chrono(true);
		//actualise_compteur();
	}

	function memorise_cmd()
	{
		action = 1;
		actualise_bouton();
		clearTimeout(o_to);
		actualise_liste(t_last_ecart);
		actualise_chrono(true);
		actualise_compteur();
	}

	function reset_cmd()
	{
		action = 0;
		unique_id = 1;
		actualise_bouton();
		t_start_total = t_start_partiel = 0;
		actualise_liste(0);
		actualise_chrono(true);
		actualise_compteur();
		efface_storage();
	}

	function exporter_html()
	{
		var __html = '<textarea id="ta-export" readonly="readonly" rows="' + unique_id + '" cols="75" wrap="soft">';
		for (var __bI = 1; __bI < unique_id; __bI++)
		{
			var __text = $('#l-m-' + __bI + ' .f-txt');
			if (__text.length)
			{
				if (is_intermediaires)
				{
					__html += $('#l-m-' + __bI + ' .f-txt').val() + '\t' + a_time_partiel[__bI] + '\t' + __bI + '\t' + a_time_total[__bI] + '\n';
				}
				else
				{
					__html += $('#l-m-' + __bI + ' .f-txt').val() + '\t' + __bI + '\t' + a_time_total[__bI] + '\n';
				}
			}
		}
		__html += '</textarea>';
		return __html;
	}

	function efface_storage()
	{
		for (var __k in localStorage)
		{
			if (__k.indexOf(ls_name) == 0)
			{
				localStorage.removeItem(__k);
			}
		}
	}

});
