jQuery(function($)
{
	var t_start_total;
	var t_last_calcul;
	var t_last_ecart;
	var t_last_ecart_total;
	var c_export = $('#cdr-exp');
	var tx_export = $('#t-exp').text();
	var tx_del = $('#t-del').text();
	var cs_total = new Array('.chr-tot div div.h_1', '.chr-tot div div.h_0', '.chr-tot div div.m_1', '.chr-tot div div.m_0', '.chr-tot div div.s_1', '.chr-tot div div.s_0', '.chr-tot div div.c_2', '.chr-tot div div.c_1', '.chr-tot div div.c_0');
	var tx_chrono = $('#tx-chrono').text();
	var tx_start = $('#tx-start').text();
	var tx_stop = $('#tx-stop').text();
	var tx_reprise = $('#tx-reprise').text();
	var tx_reset = $('#tx-reset').text();
	var a_unite_total;
	var a_time_total;
	var o_to = false;
	var action;
	var nombre;
	var ls_name = 'mlt';
	var s_title = document.title;
	var scroll_pos = -1;

	if (localStorage[ls_name + 'nbr'] != null)
	{
		init_script(parseInt(localStorage[ls_name + 'nbr']));
	}
	else
	{
		init_script(8);
	}/*
	 else
	 {
	 init_script( window.location.hash);
	 }	*/

	$('#bt-reset-all').click(function()
	{
		for ( __num = nombre; __num > 0; __num--)
		{
			reset_cmd(__num);
		}
	});

	function init_script(_nombre)
	{
		t_start_total = new Array();
		t_last_calcul = new Array();
		t_last_ecart = new Array();
		t_last_ecart_total = new Array();

		a_unite_total = new Array(1, 1, 1, 1, 1, 1, 1, 1, 1);

		a_time_total = new Array();

		if (o_to)
		{
			clearTimeout(o_to);
		}

		o_to = false;

		action = new Array();

		if (_nombre <= 1 || _nombre == undefined)
		{
			nombre = 2;
		}
		else
		if (_nombre > 36)
		{
			nombre = 36;
		}
		else
		{
			nombre = _nombre;
		}

		var __html = '<div><select id="nombre">';

		var __selected = false;

		for ( $__b = 4; $__b <= 36; $__b += 4)
		{
			if ($__b == nombre)
			{
				__html += '<option selected="selected">' + $__b + '</option>';
				__selected = true;
			}
			else
			{
				__html += '<option>' + $__b + '</option>';
			}
		}

		if (!__selected)
		{
			__html += '<option selected="selected">' + nombre + '</option>';
		}

		__html += '</select></div>';

		$('.chr-nbr').html(__html);

		$('select#nombre').change(function()
		{
			$("select option:selected").each(function()
			{
				__nombre = parseInt($(this).text());

				if (__nombre != nombre)
				{
					init_script(__nombre);

					localStorage.setItem(ls_name + 'nbr', __nombre);

					return;
				}
			});
		}).trigger('change');

		__html = '';

		for ( $__b = 1; $__b <= nombre; $__b++)
		{
			__html += '<div class="chr-mlt"><h3>' + $__b + '. ' + tx_chrono + '</h3>';
			__html += '<!-- @formatter:off --><div class="chrono' + $__b + '"><div class="chr-tot"><div><div class="grd h_1">0</div><div class="grd h_0">0</div><div>:</div><div class="grd m_1">0</div><div class="grd m_0">0</div><div>:</div><div class="grd s_1">0</div><div class="grd s_0">0</div><div>.</div><div class="pti c_2">0</div></div></div></div><!-- @formatter:on -->';
			__html += '<div class="cdr" id="cdr' + $__b + '">';
			__html += '<input type="submit" name="start" value="' + tx_start + '" class="f-str bt_start" id="bt-start' + $__b + '">';
			__html += '</div>';
			__html += '</div>';
		}

		$('.all-chrono').html(__html);

		for ( __b = 1; __b <= nombre; __b++)
		{
			action[__b] = 0;

			t_start_total[__b] = 0;

			t_last_calcul[__b] = 0;

			t_last_ecart[__b] = 0;

			a_unite_total[__b] = new Array(1, 1, 1, 1, 1, 1, 1, 1, 1);

			a_time_total[__b] = new Array();
		}

		// if ( localStorage[ ls_name + 'id'] != null && localStorage[ ls_name + 'dt'] != null)
		{
			for ( __b = 1; __b <= nombre; __b++)
			{
				if (localStorage[ls_name + 'ac' + __b] != null)
				{
					action[__b] = parseInt(localStorage[ls_name + 'ac' + __b]);

					if (localStorage[ls_name + 'lc' + __b] != null)
					{
						t_last_calcul[__b] = parseInt(localStorage[ls_name + 'lc' + __b]);
					}

					if (localStorage[ls_name + 'dt' + __b] != null)
					{
						t_start_total[__b] = parseInt(localStorage[ls_name + 'dt' + __b]);
					}

					if (action[__b] != 1)
					{
						t_reprise = new Date().getTime();
						t_start_total[__b] = t_reprise - t_last_calcul[__b] + t_start_total[__b];
						t_last_calcul[__b] = t_reprise;
					}
				}
			}

			actualise_liste(0);

			for ( __b = 1; __b <= nombre; __b++)
			{
				if (localStorage[ls_name + 't' + __b] != null)
				{
					__t_last_ecart_total = parseInt(localStorage[ls_name + 't' + __b]);

					actualise_liste(__b, __t_last_ecart_total);
				}
			}
			// ls_name + 't' + unique_id : t_last_ecart_total
			// ls_name + 'i' + unique_id : commentaire
			// ls_name + 'dt' : t_start_total);
			// ls_name + 'ac' : action);
		}

		for ( __b = 1; __b <= nombre; __b++)
		{
			actualise_bouton(__b);

			actualise_chrono(__b, t_last_calcul);
		}

		actualise_chrono();
	}

	function actualise_bouton(_num)
	{
		var $__html = '';

		if (action[_num] == 0)// demarrer
		{
			$__html += '<input type="submit" name="start" value="' + tx_start + '" class="f-str bt_start" id="bt-start' + _num + '">';
		}
		if (action[_num] == 1)// Arreter
		{
			$__html += '<input type="submit" name="stop" value="' + tx_stop + '" class="f-stp bt_stop" id="bt-stop' + _num + '">';
		}
		if (action[_num] == 2)
		{
			$__html += '<input type="submit" name="reprise" value="' + tx_reprise + '" class="f-str bt_reprise" id="bt-reprise' + _num + '">';
		}
		if (action[_num] == 2)
		{
			$__html += '<input type="submit" name="reset" value="' + tx_reset + '" class="f-stp bt_reset" id="bt-reset' + _num + '">';
		}

		$('#cdr' + _num).html($__html);

		if (action[_num] == 0)// demarrer
		{
			$('#bt-start' + _num).unbind().click(function()
			{
				var __num = $(this).attr('id').replace('bt-start', '');
				start_cmd(__num);
			});
		}
		if (action[_num] == 1)// Arreter
		{
			$('#bt-stop' + _num).unbind().click(function()
			{
				var __num = $(this).attr('id').replace('bt-stop', '');
				stop_cmd(__num);
			});
		}
		if (action[_num] == 2)
		{
			$('#bt-reprise' + _num).unbind().click(function()
			{
				var __num = $(this).attr('id').replace('bt-reprise', '');
				reprise_cmd(__num);
			});
		}
		if (action[_num] == 2)
		{
			$('#bt-reset' + _num).unbind().click(function()
			{
				var __num = $(this).attr('id').replace('bt-reset', '');
				reset_cmd(__num);
			});
		}
	}

	function actualise_liste(_num, _t_last_ecart_total)
	{
		if (_num == 0)
		{
			c_export.html('');
		}
		else
		{
			if (!$('.lst-mem').length)
			{
				c_export.html('<h4>' + tx_export + '</h4><div class="lst-mem"></div><input type="submit" name="exporter" value="' + tx_export + '" class="f-sbm bt_export" id="bt-export"><div class="export-memoire"></div>');
				$('#bt-export').click(function()
				{
					$('.export-memoire').html(exporter_html());
				});
			}
			a_mt_total = decompose_time(_t_last_ecart_total);
			a_time_total[_num] = '' + a_mt_total[0] + a_mt_total[1] + ':' + a_mt_total[2] + a_mt_total[3] + ':' + a_mt_total[4] + a_mt_total[5] + '.' + a_mt_total[6] + a_mt_total[7] + a_mt_total[8];
			var __text_comment = (localStorage[ls_name + 't' + _num] != null && localStorage[ls_name + 'i' + _num] != null) ? localStorage[ls_name + 'i' + _num] : '';
			var __html = '<div class="lgn-mem" class="l-m-' + _num + '"><input name="texte" type="text" value="' + __text_comment + '" id="i' + _num + '" placeholder="Commentaire" size="30" maxlength="30" class="f-txt">';

			__html += '<div class="mem-cpt"><div><div class="grd">' + _num + '</div></div></div>';
			__html += '<div class="mem-ttl">' + htmlTime(a_mt_total) + '</div><span class="corbeille">';
			__html += '<input type="submit" name="supprimer" value="' + tx_del + '" class="f-sbm bt_export" id="bt-del' + _num + '">';
			__html += '</div>';

			$('.lst-mem').append(__html);

			localStorage.setItem(ls_name + 't' + _num, _t_last_ecart_total);

			/*$( '.l-m-' + _num + ' .f-txt').keyup( function( )
			 {
			 localStorage.setItem( ls_name + $( this).attr( 'id'), $( this).val( ));
			 });*/

			$('#bt-del' + _num).click(function()
			{
				var ___num = $(this).attr('id').replace('bt-del', '');

				localStorage.removeItem(ls_name + 't' + ___num);

				$('#' + $(this).attr("id")).parent().parent('.lgn-mem').hide(500, function()
				{
					$(this).remove();
				});
			});

			if ($('#ta-export').length)
			{
				$('.export-memoire').html(exporter_html());
			}
		}
	}

	function delete_liste(_num)
	{
		$('.l-m-' + _num).hide(500, function()
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

	function actualise_chrono(_num, _t_last_calcul, _x)
	{
		if (_x == undefined)
		{
			_x = true;
		}
		if (_num == undefined)
		{
			if (nombre > 8)
			{
				_x = false;
			}
			for ( __b = 1; __b <= nombre; __b++)
			{
				actualise_chrono(-__b, _t_last_calcul, _x);
			}

			o_to = setTimeout(actualise_chrono, _x ? 100 : 1000);

			return;
		}
		var _init = true;

		if (_num < 0)
		{
			_num = -_num;

			if (action[_num] != 1)
			{
				return;
			}

			_init = false;
		}

		t_last_calcul[_num] = (_t_last_calcul != undefined && _t_last_calcul[_num] != 0) ? _t_last_calcul[_num] : new Date().getTime();

		if (t_start_total[_num] == 0)
		{
			t_start_total[_num] = t_last_calcul[_num];
		}
		else
		if (t_last_calcul[_num] < t_start_total[_num])
		{
			t_start_total[_num] = t_last_calcul[_num];
		}

		t_last_ecart_total[_num] = t_last_calcul[_num] - t_start_total[_num];

		a_new_unite_total = decompose_time(t_last_ecart_total[_num]);

		if (!_x)
		{
			a_new_unite_total[6] = '*';
		}
		/*if ( action[_num] == 0 || action[_num] == 2)
		 {
		 document.title = s_title;
		 }
		 else
		 {
		 document.title = ('' + a_new_unite_total[ 0] + a_new_unite_total[ 1] + ':' + a_new_unite_total[ 2] + a_new_unite_total[ 3] + ':' + a_new_unite_total[ 4] + a_new_unite_total[ 5])
		 }*/

		var __nul_total = true;

		for (var __k in a_new_unite_total)
		{
			if (a_new_unite_total[__k] > 0)
			{
				a_nul_total = false;
			}

			if (__k > 6)
			{
				break;
			}

			if (a_new_unite_total[__k] != a_unite_total[_num][__k] || _init)
			{
				a_unite_total[_num][__k] = a_new_unite_total[__k];
				$('.chrono' + _num + ' ' + cs_total[__k]).text(a_new_unite_total[__k]);
				$('.chrono' + _num + ' ' + cs_total[__k]).css("color", (__k > 5) ? (__nul_total) ? "#AAA" : "#555" : (__nul_total) ? "#888" : "#000");
			}
		}

		if (_init)
		{
			localStorage.setItem(ls_name + 'dt' + _num, t_start_total[_num]);
			localStorage.setItem(ls_name + 'ac' + _num, action[_num]);
			localStorage.setItem(ls_name + 'lc' + _num, t_last_calcul[_num]);
		}
	}

	function repositione()
	{
		if (scroll_pos >= 0)
		{
			$(window).scrollTop(scroll_pos);
		}
	}

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

	function start_cmd(_num)
	{
		action[_num] = 1;
		t_start_total[_num] = 0;
		actualise_bouton(_num);
		actualise_chrono(_num);
	}

	function stop_cmd(_num)
	{
		action[_num] = 2;
		actualise_bouton(_num);
		// clearTimeout( o_to);
		actualise_chrono(_num);
		actualise_liste(_num, t_last_ecart_total[_num]);
	}

	function reprise_cmd(_num)
	{
		action[_num] = 1;
		actualise_bouton(_num);
		t_reprise = new Date().getTime();
		t_start_total[_num] = t_reprise - t_last_calcul[_num] + t_start_total[_num];
		delete_liste(_num);
		actualise_chrono(_num);
	}

	function reset_cmd(_num)
	{
		action[_num] = 0;
		actualise_bouton(_num);
		t_start_total[_num] = 0;
		delete_liste(_num);
		localStorage.removeItem(ls_name + 't' + _num);
		actualise_chrono(_num);
	}

	function exporter_html()
	{
		var __rows = 1;

		var __html = '';

		for (var __bI = 1; __bI <= nombre; __bI++)
		{
			var __text = $('.l-m-' + __bI + ' .f-txt');
			if (__text.length)
			{
				__html += $('.l-m-' + __bI + ' .f-txt').val() + '\t' + __bI + '\t' + a_time_total[__bI] + '\n';

				__rows++;
			}
		}

		return '<textarea id="ta-export" readonly="readonly" rows="' + __rows + '" cols="75" wrap="soft">' + __html + '</textarea>';
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
