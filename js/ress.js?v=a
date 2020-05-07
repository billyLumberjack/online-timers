jQuery(function($)
{
	var serveur = '';
	var file = '';
	var pos_pub_1 = 550;
	var liste_pub = new Array();
	var liste_pub_aff = new Array();
	var nbr_pub = 0;

	var emplacement = 0;

	var pub_ok = new Array(0, 0);

	var bandeau_actif = 0;

	var 	first = true;
	
	var cacher_pub = false;
	
	init_ress();
	actualise_ress();

	actualise_bandeau();

	$('#bd-bup-nav-1 ul li a,#bd-bup-nav-2 ul li a').click(function(_e)
	{
		_e.preventDefault();
		
		if (this.text == 'x')
		{
			cacher_pub = true;
			
			if (emplacement == 2)
			{
				actualise_ress();
			}
		}
		else
		{
			clearTimeout(o_bd);
			
			bandeau_actif = parseInt(this.text) - 1;
			
			actualise_bandeau(60000);			
		}
	});

	function init_ress()
	{
		var __pub1_class = $('#pub1').attr('class');

		var __decompose = __pub1_class.split('_');

		serveur = __decompose[0].replace('--','.');
		serveur = serveur.replace('--','.');
		file = __decompose[1];
		pos_pub_1 = __decompose[2];

		nbr_pub = 0;

		/*liste_pub_aff[1] = new Array();
		liste_pub_aff[2] = new Array();*/
	
		for (var __i = 3; ; __i++)
		{
			if (__decompose[__i] == undefined)
			{
				break;
			}
			
			nbr_pub++;

			liste_pub[nbr_pub] = __decompose[__i];
			liste_pub_aff['1' + '-' + nbr_pub] = false;
			liste_pub_aff['2' + '-' + nbr_pub] = false;
		}

		for ( __ul_id = 1; __ul_id <= 2; __ul_id++)
		{
			var __html = '<ul id="bd-bup-' + __ul_id + '">';
			var __bt_html = '';
			
			var __id = 1;

			for (; ; __id++)
			{
				if (liste_pub[__id] == undefined)
				{
					break;
				}
				
				__id_pub = parseInt(liste_pub[__id]);

				if (!__id_pub)
				{
					break;
				}

				__html += '<li id="pub-b-' + __ul_id + '-' + __id_pub + '" style="min-height:';
				
				if (__ul_id == 1)
				{
					__html += '125';
				}
				else
				{
					__html += '325';
				}
				
				__html += 'px;"></li>';

				__bt_html += '<li id="pub-n-' + __ul_id + '-' + __id_pub + '"><a href="#"';

				__bt_html += '>' + __id + '</a></li>';
				
				liste_pub_aff[__id] = false;
			}

			__html += '<li id="bd-bup-nav-' + __ul_id + '"><ul>';

			if (__ul_id == 2)
			{
				__bt_html += '<li id="pub-n-2-x" title="Cacher les publicités"><a href="#">x</a></li>';
			}
			
			__html += __bt_html;
			
			__html += '</ul></li></ul>';

			$('#pub' + __ul_id).html(__html);
			$('#pub' + __ul_id).hide();

			for (; ; __id++)
			{
				if (liste_pub[__id] == undefined)
				{
					break;
				}

				$('#pub-b-' + __ul_id + '-' + __id_pub).hide();
			}
		}
	}


	$(window).resize(function()
	{
		actualise_ress();
	});

	function actualise_ress()
	{
		var __new_emplacement = 1;

		/* var $__new_position = $('#scl').position().top;

		 /*if ($__new_position > 0)
		 {
		 pos_pub_1 = $__new_position + 80;
		 }*/

		if ($(window).height() < pos_pub_1)
		{
			if ($(window).width() > 1250)
			{
				__new_emplacement = 3;
			}
			else
			if ($(window).width() > 780)
			{
				__new_emplacement = 2;
			}
		}
		
		if (cacher_pub && __new_emplacement == 2)
		{
			__new_emplacement = 1;
		}

		if (__new_emplacement != emplacement)
		{
			if (emplacement == 3)
			{
				$('#ctr-pg').css('margin', '0 auto');
			}
			
			if (emplacement == 1 || __new_emplacement == 1)
			{
				first = true;
			
				emplacement = __new_emplacement;
				
				active_bandeau(bandeau_actif);				
			}

			emplacement = __new_emplacement;

			$('#pub' + emplacement).show();
		}

		if (emplacement == 1)
		{
			if (!pub_ok[1])
			{
				// $('#pub' + emplacement).html( Math.floor((Math.random()*100)));
				//$('#pub1').html('<iframe src="http://' + serveur + '/pub/pub' + file + '-l.php" width="750" height="180"></iframe>');
				$('#pub1').show();

				pub_ok[1] = 1;
			}

			$('#pub2').hide();
		}
		else
		if (emplacement == 2 || emplacement == 3)
		{
			$('#pub1').hide();

			if (!pub_ok[0])
			{
				$('#pub2').show();
				// $('#pub2').html('<iframe src="http://' + serveur + '/pub/pub' + file + '-l.php" width="260" height="400"></iframe>');
			}

			pub_ok[0] = emplacement;

			if (emplacement == 2)
			{
				$('#pub2').css(
				{
					'display' : 'block',
					'margin-right' : '10',
					'float' : 'right',
					'position' : 'initial',
					'width' : '270px',
					'height' : '380px'
				});
			}
			else
			{
				$('#pub2').css(
				{
					'display' : 'block',
					'margin-right' : '0',
					'float' : 'none',
					'position' : 'absolute',
					'right' : '-260px',
					'width' : '270px',
					'height' : '380px'
				});
			}
		}

		if (emplacement == 2)
		{
			$('#scl').css('margin-right', 270);
			$('#pub-n-2-x').show();
			//$('#tt').css('margin-right', 260);
		}
		else
		{
			$('#scl').css('margin-right', 10);
			//$('#tt').css('margin-right', 10);
		}

		if (emplacement == 3)
		{
			var __margin = Math.floor(($(window).width() - 1260) / 2);

			if (__margin < 0)
			{
				__margin = 0;
			}

			// $('#ctr-pg').css('margin', '10px auto');

			$('#ctr-pg').css('margin', '0 0 0 ' + __margin + 'px');
			$('#pub-n-2-x').hide();
		}
	}

	function active_bandeau(_i)
	{
		var __num_pub = liste_pub[_i];
		
		for ( __j = 1; __j <= nbr_pub; __j++)
		{                
			var __code = (emplacement == 1 ? '1' : '2')  + '-' + liste_pub[__j];
				
			if (_i == __j)
			{				
				if (!liste_pub_aff[__code])
				{
					// $('#pub-b' + __j).html('<div id="pub-ici"></div><sc' + 'ript language="javascript" type="text/javascript" src="ht' + 'tp://' + liste_pub[0] + '/pub/pub-fr-' + liste_pub[__j] + v_h + '.js"></scr' + 'ipt>');

					// $('#pub-b' + __j).load('http://' + liste_pub[0] + '/pub/pub-fr-' + liste_pub[__j] + v_h + '.html');
					var $__html = '';
					
					if (emplacement == 1)
					{
						$__html = '<iframe src="http://' + serveur + '/pub/pub-' + file + '-' + __code + '.php" width="750" height="125"></iframe>';
					}
					else
					{
						$__html = '<iframe src="http://' + serveur + '/pub/pub-' + file + '-' + __code + '.php" width="250" height="325"></iframe>';
					}

					$('#pub-b-' + __code).html($__html);
					
					liste_pub_aff[__code] = true;
				}
				
				$('#pub-b-' + __code).show();

				if (!first)
				{
					$('#pub-b-' + __code).attr('class', 'bounceIn animated');
				}

				$('#pub-n-' + __code).attr('class', 'active');
			}
			else
			{
				$('#pub-b-' + __code).hide();
				$('#pub-b-' + __code).attr('class', '');
				$('#pub-n-' + __code).attr('class', '');
			}
		}

		first = false;
	}

	function actualise_bandeau(_time)
	{
		if (_time === undefined)
		{
			_time = 30000;
		}

		bandeau_actif++;

		if (bandeau_actif > nbr_pub)
		{
			bandeau_actif = 1;
		}

		active_bandeau( bandeau_actif);

		o_bd = setTimeout(actualise_bandeau, _time);
	}

});
