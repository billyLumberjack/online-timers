jQuery(function($)
{

	var t_timer = new Array();

	var tmr_timer = 0;

	var titre = document.title;

	var c_fav_icone = $('.fav-icone');

	var t_minute = $('#t-minute').text();
	var t_min = $('#t-minute').text();
	var t_s = $('#t-s').text();
	var t_ecoucle = $('#t-ecoucle').text();
	var t_depasse = $('#t-depasse').text();
	var t_close = $('#t-close').text();

	$(document).ready(function()
	{
		ls_init();
		
		bip_actif();
	});

	$('.nbr-clk li a').click(function(_e)
	{
		_e.preventDefault();

		var __decompose = $(this).attr('id').split('-');

		bip_actif(__decompose[1]);
	});

	function bip_actif(_num)
	{
		$('.nbr-clk li a').each(function()
		{
			var __decompose = $(this).attr('id').split('-');

			if ( _num == undefined)
			{
				if ( localStorage['t2_nbr_bip'] != null )
				{
					_num = localStorage['t2_nbr_bip'];
				}
				else
				{
					_num = 4;				
				}
			}
			
			if (__decompose[1] == _num)
			{
				$(this).addClass('active');
				
				localStorage['t2_nbr_bip'] = _num;
			}
			else
			{
				$(this).removeClass('active');
			}
		});
	}

	$('.ajax').click(function(_e)
	{
		_e.preventDefault();

		var __decompose = $(this).attr('id').split('-');

		var __temps = parseInt(__decompose[0]);

		__temps *= 60;

		if (__decompose[1] != undefined)
		{

			var __seconde = parseInt(__decompose[1]);

			__temps += __seconde;
		}

		addMinuteur(__temps, get_t_time(__temps));
	});

	$('#f-valide').click(function(_e)
	{
		_e.preventDefault();

		var __minute = parseInt($('#f-minute').val());
		var __seconde = parseInt($('#f-seconde').val());

		var __temps = __minute * 60 + __seconde;

		addMinuteur(__temps, get_t_time(__temps));
	});

	function get_t_time(_temps)
	{
		var __temps_m = Math.floor(_temps / 60);
		var __temps_s = Math.floor(_temps - __temps_m * 60);

		var __titre = '';

		if (__temps_m > 1)
		{
			__titre += ' ' + __temps_m + ' ' + t_min + 's';
		}
		else
		if (__temps_m == 1)
		{
			__titre += ' ' + __temps_m + ' ' + t_min;
		}

		if (__temps_s > 0)
		{
			__titre += ' ' + __temps_s;

			if (__temps_m == 0)
			{
				__titre += ' ' + t_s;
			}
		}

		return __titre;
	}

	function ls_delete(_ls_id)
	{		
		_ls_id = parseInt(_ls_id);
				
		
		for (var __id in t_timer)
		{
			if (t_timer[__id].ls_id == _ls_id)
			{
				t_timer[__id].ls_id = 0;
				t_timer[__id].temps = 0;
			}
		}
		
		var __ls_id_max = parseInt(localStorage['t2_id_max']);

		var __ls_id_1 = _ls_id;
							
		for ( var __ls_id_2 = __ls_id_1 + 1; __ls_id_2 <= __ls_id_max; __ls_id_2++)
		{			
			if (localStorage['t2_depart' + __ls_id_2] == null)
			{
				continue;
			}

			localStorage['t2_depart' + __ls_id_1] = localStorage['t2_depart' + __ls_id_2];
			localStorage['t2_temps' + __ls_id_1] = localStorage['t2_temps' + __ls_id_2];
			localStorage['t2_nom' + __ls_id_1] = localStorage['t2_nom' + __ls_id_2];
			localStorage['t2_dring' + __ls_id_1] = localStorage['t2_dring' + __ls_id_2];	
			
			for (var __id in t_timer)
			{
				if (t_timer[__id].ls_id == __ls_id_2)
				{
					t_timer[__id].ls_id = __ls_id_1;
				}
			}
			
			__ls_id_1++;		
		}

		for ( ; __ls_id_1 <= __ls_id_max; __ls_id_1++)
		{
			if (localStorage['t2_depart' + __ls_id_1] == null)
			{
				continue;
			}
			
			localStorage.removeItem('t2_depart' + __ls_id_1);
			localStorage.removeItem('t2_temps' + __ls_id_1);
			localStorage.removeItem('t2_nom' + __ls_id_1);
			localStorage.removeItem('t2_dring' + __ls_id_1);
			
			for (var __id in t_timer)
			{
				if (t_timer[__id].ls_id == __ls_id_1)
				{
					t_timer[__id].ls_id = 0;
					t_timer[__id].temps = 0;
				}
			}
		}
	}

	function ls_init()
	{
		/*var __ancre = document.location.hash.substring(1).split('&');

		if (__ancre.length && __ancre[0] == 'minuteur')
		{
			var __ajouteTemps = true;
			
			ls_id = 0;

			if (localStorage['t2_id_max'] == null)
			{
				ls_id = 1;
			}
			else
			{
				ls_id_max = parseInt(localStorage['t2_id_max']);

				for ( __ls_id = 1; __ls_id <= ls_id_max; __ls_id++)
				{
					if (localStorage['t2_depart' + __ls_id] == null && ls_id == 0)
					{
						ls_id = __ls_id;
					}
					else
					if (localStorage['t2_depart' + __ls_id] == __ancre[1] && localStorage['t2_temps' + __ls_id] == __ancre[2])
					{
						__ajouteTemps = false;
					}
				}
				if (ls_id == 0)
				{
					ls_id = ls_id_max + 1;
				}
			}

			if (__ajouteTemps)
			{
				localStorage['t2_depart' + ls_id] = __ancre[1];
				localStorage['t2_temps' + ls_id] = __ancre[2];
				localStorage['t2_nom' + ls_id] = 'minuteur';
				localStorage['t2_dring' + ls_id] = 1;

				if (localStorage['t2_id_max'] == null || ls_id > localStorage['t2_id_max'])
				{
					localStorage['t2_id_max'] = ls_id;
				}
			}
		}*/

		if (localStorage['t2_id_max'] == null)
		{
			return;
		}

		var __ls_id_max_new = 0;

		var __ls_id_max = parseInt(localStorage['t2_id_max']);

		var __now = new Date().getTime();

		var __id = 0;

		for ( __ls_id = 1; __ls_id <= __ls_id_max; __ls_id++)
		{
			if (localStorage['t2_depart' + __ls_id] != null)
			{
				t_fin = parseInt(localStorage['t2_depart' + __ls_id]) + (parseInt(localStorage['t2_temps' + __ls_id]) * 2000);

				if (t_fin < __now)
				{
					ls_delete(__ls_id);
				}
				else
				{
					__ls_id_max_new = __ls_id;

					t_timer[__id] = new Object();
					t_timer[__id].ls_id = __ls_id;
					t_timer[__id].depart = parseInt(localStorage['t2_depart' + __ls_id]);
					t_timer[__id].temps = parseInt(localStorage['t2_temps' + __ls_id]);
					t_timer[__id].dring = parseInt(localStorage['t2_dring' + __ls_id]);

					afficheMinuteur(__id, get_t_time(t_timer[__id].temps), t_timer[__id].dring);

					__id++;
				}
			}
		}

		if (__ls_id_max_new > 0)
		{
			localStorage['t2_id_max'] = __ls_id_max_new;

			actualiseTimer();
		}
		else
		{
			localStorage.removeItem('t2_id_max');
		}
	}

	function actualiseTimer()
	{
		var __dring = 0;
		
		var __bar = 0;

		var __now = new Date().getTime();

		var __now_s = Math.floor(__now / 1000);

		var __time_for_title = 99999999;

		for (var __id in t_timer)
		{
			if (t_timer[__id].temps <= 0)
			{
				continue;
			}

			var s_ecoule = (t_timer[__id].depart - __now - 10 ) / 1000;

			var s = t_timer[__id].temps + s_ecoule;

			var ls_id = t_timer[__id].ls_id;

			{
				var temps_total = t_timer[__id].temps;

				var temps_total_m = Math.floor(temps_total / 60);
				var temps_total_s = Math.floor(temps_total - temps_total_m * 60);

				var __titre = '';

				if (temps_total_m > 1)
				{
					__titre += ' ' + temps_total_m + ' ' + t_min + 's';
				}
				else
				if (temps_total_m == 1)
				{
					__titre += ' ' + temps_total_m + ' ' + t_min;
				}

				if (temps_total_s > 0)
				{
					__titre += ' ' + temps_total_s;

					if (temps_total_m == 0)
					{
						__titre += ' ' + t_s + 's';
					}
				}

				if (s <= 0)
				{
					var s_depasse = 1 - s;

					var m_depasse = Math.floor(s_depasse / 60);
					s_depasse = Math.floor(s_depasse - m_depasse * 60);

					var depasse = '';

					if (m_depasse == 0)
					{
						depasse += '0:';
					}
					else
					{
						depasse += m_depasse + ':';
					}
					if (s_depasse < 10)
					{
						depasse += '0' + s_depasse;
					}
					else
					{
						depasse += s_depasse;
					}

					__titre += ', '.t_ecoucle + ' ' + depasse;
				}

				$('#m' + __id + '-prd').text(__titre);
			}

			if (s > 0)
			{
				var m = Math.floor(s / 60);

				s = Math.floor(s - m * 60);

				$('#m' + __id + '-s-nbr').text(s);
				$('#m' + __id + '-s-txt').text('s');

				if (m == 0)
				{
					$('#m' + __id + '-m-nbr').html('&nbsp;');
				}
				else
				{
					if ( m> 99)
					{
						$('#m' + __id + '-m-nbr').html( '<span style="font-size:50px;">' + m + '</span>');	
					}
					else
					{
						$('#m' + __id + '-m-nbr').text(m);	
					}
				}

				if (m == 0)
				{
					if (s < 15)
					{
						$('#m' + __id + '-bar').removeAttr('class').addClass('cpt cdr-rge');

						__bar |= 0x8;

						if ((__now_s & 0x1) == 0x1)
						{
							changeFavIcon('icone/icone_m_r.png');
						}
						else
						{
							changeFavIcon('icone/icone_m_ri.png');
						}
					}
					else
					if (s < 30)
					{
						$('#m' + __id + '-bar').removeAttr('class').addClass('cpt cdr-org');

						__bar |= 0x4;

						if ((__now_s & 0x2) == 0x2)
						{
							changeFavIcon('icone/icone_m_o.png');
						}
						else
						{
							changeFavIcon('icone/icone_m_oi.png');
						}
					}
					else
					if (s < 60)
					{
						$('#m' + __id + '-bar').removeAttr('class').addClass('cpt cdr-vrt');

						__bar |= 0x10;

						if ((__now_s & 0x2) == 0x2)
						{
							changeFavIcon('icone/icone_m_o.png');
						}
						else
						{
							changeFavIcon('icone/icone_m_oi.png');
						}
					}
					else
					{
						if (s < 0)
						{
							$('#m' + __id + '-bar').removeAttr('class').addClass('cpt cdr-rge');

							__bar |= 0x2;
						}
						else
						{
							$('#m' + __id + '-bar').removeAttr('class').addClass('cpt');

							__bar |= 0x1;
						}

						if ((__now_s & 0x4) == 0x4)
						{
							changeFavIcon('icone/icone_m_v.png');
						}
						else
						{
							changeFavIcon('icone/icone_m_vi.png');
						}
					}
				}

				if (m * 60 + s < __time_for_title)
				{
					__time_for_title = m * 60 + s;

					if (s < 10)
					{
						document.title = (m + ':0' + s);
					}
					else
					{
						document.title = (m + ':' + s);
					}
				}
			}
			else
			{
				__time_for_title = 0;

				__bar |= 0x8;

				if ( s > -(1 + parseInt(localStorage['t2_nbr_bip'])))
				{
					__dring |= t_timer[__id].dring;
	
					if (t_timer[__id].dring == 1)
					{
						t_timer[__id].dring = 2;
					}
				}

				$('#m' + __id + '-m-nbr').html('&nbsp;');
				$('#m' + __id + '-s-nbr').html('&nbsp;');

				if (s > -2)
				{
					$('#m' + __id + '-bar').removeAttr('class').addClass('cpt cdr-rge wobble animated');
				}
				else
				if (s > -4)
				{
					$('#m' + __id + '-bar').removeAttr('class').addClass('cpt');
				}
				else
				if (s > -6)
				{
					$('#m' + __id + '-bar').removeAttr('class').addClass('cpt wobble animated');
				}
				else
				if (((__now_s) & 0x1) == 0x1)
				{
					if ((__now_s & 0x2) == 0x2)
					{
						changeFavIcon('icone/icone_m_o.png');
						document.title = ('D R I N G G G G');
					}
					else
					{
						changeFavIcon('icone/icone_m_v.png');
						document.title = ('0:00');
					}
				}
				else
				{
					if ((__now_s & 0x2) == 0x2)
					{
						changeFavIcon('icone/icone_m_r.png');
						document.title = ('DRIiiiiiiiiiiiNG');
					}
					else
					{
						changeFavIcon('icone/icone_m_oi.png');
						document.title = ('DRING... DRING...');
					}
				}

				s = 1 - s;

				var m = Math.floor(s / 60);

				s = Math.floor(s - m * 60);

				depasse = t_depasse + ' ';

				if (m == 0)
				{
					depasse += '0:';
				}
				else
				{
					depasse += m + ':';
				}
				if (s < 10)
				{
					depasse += '0' + s;
				}
				else
				{
					depasse += s;
				}

				$('#m' + __id + '-bar div.cadre').html('<div class="cdr-t-d">' + depasse + '</div>');

				if (t_timer[__id].dring == 0)
				{
					// c_minutes_d.text('')
				}
			}
		}

		if (__dring == 1)
		{
			$('#swf').html("<audio autoPlay='autoPlay' loop='loop'><source src='http://www.minuteur-en-ligne.fr/media/bip.ogg'/><source src='http://www.minuteur-en-ligne.fr/media/bip.mp3'/><object classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000' width='50' height='50' id='Sonnerie' align='middle'><param name='movie' value='media/sonnerie.swf'/><param name='quality' value='high'/><param name='bgcolor' value='#ffffff'/><param name='play' value='true'/><param name='loop' value='true'/><param name='wmode' value='window'/><param name='scale' value='showall'/><param name='menu' value='true'/><param name='devicefont' value='false'/><param name='salign' value=''/><param name='allowScriptAccess' value='sameDomain'/><!--[if !IE]>--><object type='application/x-shockwave-flash' data='http://www.minuteur-en-ligne.fr/media/sonnerie.swf' width='50' height='50'><param name='movie' value='http://www.minuteur-en-ligne.fr/media/sonnerie.swf'/><param name='quality' value='high'/><param name='bgcolor' value='#ffffff'/><param name='play' value='true'/><param name='loop' value='true'/><param name='wmode' value='window'/><param name='scale' value='showall'/><param name='menu' value='true'/><param name='devicefont' value='FALSE'/><param name='salign' value=''/><param name='allowScriptAccess' value='sameDomain'/><!--<![endif]--><!--[if !IE]>--></object><!--<![endif]--></object></audio>");
		}
		else
		if (__dring == 0)
		{
			$('#swf').html('');
		}

		clearTimeout(tmr_timer);

		tmr_timer = setTimeout(actualiseTimer, 1000);
	}

	function afficheMinuteur(_id, _titre, _dring)
	{
		var __html = '<div class="cpt" id="m' + _id + '-bar"><h6>' + _titre + '</h6><div class="cadre">';
		__html += '<div class="cdr-m" id="m' + _id + '-m-nbr"></div>';
		__html += '<div class="cdr-s" id="m' + _id + '-s-nbr"></div>';
		__html += '</div><div>';
		__html += '<div class="cdr-m_d"><div id="m' + _id + '-ldring"><div class="ico-clo" id="ico-clo';
		
		if ( _dring == undefined || _dring == 0)
		{
			__html += '-off';
		}
		else
		{
			__html += '-on';
		}
		
		__html += '"><a href="#"><span></span></a></div></div><div class="icone-close" id="m' + _id + '-lclose"><a href="#"><span>' + t_close + '</span></a></div></div>';
		__html += '</div></div>';

		$('#cdr-blo').append(__html);

		$('#m' + _id + '-bar').hide().fadeIn(500);
		/*$('#cdr-blo').fadeIn( 500, function() {
		 $(this).append(__html);
		 });*/

		$('#m' + _id + '-ldring').click(function(_e)
		{
			_e.preventDefault();

			var __id =  $(this).attr('id').substring(1, $(this).attr('id').lastIndexOf('-'));

			var __dring = 1;

			__dring = ($('#m' + __id + '-ldring div.ico-clo').attr('id') == 'ico-clo-on') ? 0 : 1;

			t_timer[__id].dring = __dring;

			localStorage['t3_dring' + t_timer[__id].ls_id] = __dring;

			if (__dring)
			{
				$('#m' + __id + '-ldring div.ico-clo').attr('id', 'ico-clo-on');
			}
			else
			{
				$('#m' + __id + '-ldring div.ico-clo').attr('id', 'ico-clo-off');
			}
		});

		$('#m' + _id + '-lclose').click(function(_e)
		{
			_e.preventDefault();
			
			var __id = $(this).attr('id').substring(1, $(this).attr('id').lastIndexOf('-'));

			ls_delete(t_timer[__id].ls_id);


			$('#m' + __id + '-bar').hide(500, function()
			{
				$(this).remove();

				document.title = titre;
			});
		});
	}

	function addMinuteur(_temps, _nom)
	{
		var __ls_id = 1;
		
		if (localStorage['t2_id_max'] != null)
		{
			var __ls_id_max = parseInt(localStorage['t2_id_max']);

			for ( __ls_id = 1; __ls_id <= __ls_id_max; __ls_id++)
			{
				if (localStorage['t2_depart' + __ls_id] == null)
				{
					break;
				}
			}
		}

		var __now = new Date().getTime();

		localStorage['t2_depart' + __ls_id] = __now;
		localStorage['t2_temps' + __ls_id] = _temps;
		localStorage['t2_nom' + __ls_id] = _nom;
		localStorage['t2_dring' + __ls_id] = 1;

		if (localStorage['t2_id_max'] == null || __ls_id > localStorage['t2_id_max'])
		{
			localStorage['t2_id_max'] = __ls_id;
		}

		__id = t_timer.length;

		if (__id == undefined)
		{
			__id = 0;
		}

		t_timer[__id] = new Object();
		t_timer[__id].ls_id = __ls_id;
		t_timer[__id].depart = __now;
		t_timer[__id].temps = parseInt(_temps);
		t_timer[__id].dring = 1;

		afficheMinuteur(__id, get_t_time(t_timer[__id].temps), 1);

		if (__id == 0)
		{
			actualiseTimer();
		}
	}

	function changeFavIcon($_png)
	{
		c_fav_icone.attr('href', $_png);
	}

});
