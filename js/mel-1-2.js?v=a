jQuery(function($)
{
	var depart = new Date();
	var depart_time = depart.getTime();
	var c_minutes_block = $('#cdr-m');
	var c_secondes_block = $('#cdr-s');
	var c_minutes_d = $('#cdr-m_d');
	var c_secondes_d = $('#cdr-s_d');
	var c_ecoucle_d = $('#cdr-t-e');
	var c_depasse_d = $('#cdr-t-d');
	var c_fav_icone = $('.fav-icone');
	var t_minute = c_minutes_d.text();
	var t_seconde = c_secondes_d.text();
	var t_ecoucle = c_ecoucle_d.text();
	var t_depasse = c_depasse_d.text();
	var sound = 0x21;
	var decompte = parseInt(c_minutes_block.text()) * 60 + parseInt(c_secondes_block.text());

	init();

	$(document).ready(function()
	{
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

			if (_num == undefined)
			{
				if (localStorage['t1_nbr_bip'] != null)
				{
					_num = localStorage['t1_nbr_bip'];
				}
				else
				{
					_num = 999;
				}
			}

			if (__decompose[1] == _num)
			{
				$(this).addClass('active');

				localStorage['t1_nbr_bip'] = _num;
			}
			else
			{
				$(this).removeClass('active');
			}
		});
	}


	$('.ico-clo a').click(function()
	{
		if ($('#ico-clo-on').length)
		{
			$('#ico-clo-on').attr('id', 'ico-clo-off');

			var __now = new Date();

			localStorage.setItem('sound', __now.getTime());

			sound = 0x20;
		}
		else
		{
			$('#ico-clo-off').attr('id', 'ico-clo-on');

			localStorage.setItem('sound', 0);

			sound = 0x21;
		}
	});

	function init()
	{
		var __now = new Date();
				
		if ( typeof history.pushState !== "undefined")
		{
			if (location.search == '')
			{
				history.pushState('data', '', location.pathname + '?time=' + (depart_time - 1351771000000));
			}
			else
			{
				depart_time = 1351771000000 + parseInt(getUrlVars()["time"]);

				if (decompte + (((depart_time - __now.getTime() - 10) / 1000)) < 0)
				{
					depart_time = depart.getTime();
					history.pushState('data', '', location.pathname + '?time=' + (depart_time - 1351771000000));
				}
			}
		}
		
		setDate();
		
		c_minutes_d.show();
		c_secondes_d.show();
		c_ecoucle_d.show();

		if (parseInt( localStorage['sound']) + 15000 > __now.getTime())
		{
			$('#ico-clo').attr('id', 'ico-clo-off');
			sound = 0x20;
		}
		else
		{
			$('#ico-clo').attr('id', 'ico-clo-on');
			sound = 0x21;
		}
	}

	function setDate()
	{
		var __now = new Date();
		var s_ecoule = ((depart_time - __now.getTime() - 10) / 1000);
		var s = decompte + s_ecoule;
		s_ecoule = 1 - s_ecoule;
		var m_ecoule = Math.floor(s_ecoule / 60);
		s_ecoule = Math.floor(s_ecoule - m_ecoule * 60);
		var ecoule = t_ecoucle;
		if (m_ecoule == 0)
		{
			ecoule += '0:';
		}
		else
		{
			ecoule += m_ecoule + ':';
		}
		if (s_ecoule < 10)
		{
			ecoule += '0' + s_ecoule;
		}
		else
		{
			ecoule += s_ecoule;
		}
		if (s > 0)
		{
			var m = Math.floor(s / 60);
			s = Math.floor(s - m * 60);
			if (m == 0)
			{
				c_minutes_block.html('&nbsp;');
			}
			else
			{
				c_minutes_block.text(m);
			}
			if (s < 10)
			{
				c_secondes_block.text('0' + s);
			}
			else
			{
				c_secondes_block.text(s);
			}
			if (s < 2)
			{
				c_secondes_d.text(t_seconde);
				c_ecoucle_d.text(ecoule);
			}
			else
			{
				c_secondes_d.text(t_seconde + 's');
				c_ecoucle_d.text(ecoule);
			}
			if (m > 1)
			{
				c_minutes_d.text(t_minute + 's');
			}
			else
			if (m == 1)
			{
				c_minutes_d.text(t_minute);
			}
			else
			if (m == 0)
			{
				if (sound & 0x1)
				{
					c_minutes_d.text("");
				}
				if (s < 15)
				{
					c_minutes_block.removeClass('cdr-vrt');
					c_secondes_block.removeClass('cdr-vrt');
					c_minutes_block.removeClass('cdr-org');
					c_secondes_block.removeClass('cdr-org');
					c_minutes_block.addClass('cdr-rge');
					c_secondes_block.addClass('cdr-rge');
					if ((s & 0x1) == 0x1)
					{
						changeFavIcon("icone/icone_m_r.png");
					}
					else
					{
						changeFavIcon("icone/icone_m_ri.png");
					}
				}
				else
				if (s < 30)
				{
					c_minutes_block.removeClass('cdr-vrt');
					c_secondes_block.removeClass('cdr-vrt');
					c_minutes_block.addClass('cdr-org');
					c_secondes_block.addClass('cdr-org');
					c_minutes_block.removeClass('cdr-rge');
					c_secondes_block.removeClass('cdr-rge');
					if ((s & 0x2) == 0x2)
					{
						changeFavIcon("icone/icone_m_o.png");
					}
					else
					{
						changeFavIcon("icone/icone_m_oi.png");
					}
				}
				else
				{
					c_minutes_block.addClass('cdr-vrt');
					c_secondes_block.addClass('cdr-vrt');
					c_minutes_block.removeClass('cdr-org');
					c_secondes_block.removeClass('cdr-org');
					c_minutes_block.removeClass('cdr-rge');
					c_secondes_block.removeClass('cdr-rge');
					if ((s & 0x4) == 0x4)
					{
						changeFavIcon("icone/icone_m_v.png");
					}
					else
					{
						changeFavIcon("icone/icone_m_vi.png");
					}
				}
			}
			if (s < 10)
			{
				document.title = (m + ':0' + s);
			}
			else
			{
				document.title = (m + ':' + s);
			}
			setTimeout(setDate, 1000);
		}
		else
		{

			if (sound == 0x21)
			{
				sound = 0x1;
				$('.swf').html("<audio autoPlay='autoPlay' loop='loop'><source src='media/bip.ogg'/><source src='media/bip.mp3'/><object classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000' width='50' height='50' id='Sonnerie' align='middle'><param name='movie' value='media/sonnerie.swf'/><param name='quality' value='high'/><param name='bgcolor' value='#ffffff'/><param name='play' value='true'/><param name='loop' value='true'/><param name='wmode' value='window'/><param name='scale' value='showall'/><param name='menu' value='true'/><param name='devicefont' value='false'/><param name='salign' value=''/><param name='allowScriptAccess' value='sameDomain'/><!--[if !IE]>--><object type='application/x-shockwave-flash' data='media/sonnerie.swf' width='50' height='50'><param name='movie' value='media/sonnerie.swf'/><param name='quality' value='high'/><param name='bgcolor' value='#ffffff'/><param name='play' value='true'/><param name='loop' value='true'/><param name='wmode' value='window'/><param name='scale' value='showall'/><param name='menu' value='true'/><param name='devicefont' value='false'/><param name='salign' value=''/><param name='allowScriptAccess' value='sameDomain'/><!--<![endif]--><a href='http://www.adobe.com/go/getflash'><img src='http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif' alt='Obtenir Adobe Flash Player'/></a><!--[if !IE]>--></object><!--<![endif]--></object></audio>");
				c_minutes_d.html("<input type='submit' name='muet' value='Muet' class='f-sbm' id='bt_muet'>");
				$('html').css("background-color", "#EEE");
			}
			else
			if (sound == 0x20 || (sound == 0x1 && s < -(1 + parseInt(localStorage['t1_nbr_bip']))))
			{
				/*
				 alert(s);
				 alert(-parseInt(localStorage['t1_nbr_bip']));*/
				sound = 0x0;
				$('.swf').html("");
				$('html').css("background-color", "#FFF");
			}

			c_minutes_block.html('&nbsp;');
			c_secondes_block.html('&nbsp;');

			if (((-s) & 0x1) == 0x1)
			{
				c_minutes_block.removeClass('cdr-vrt');
				c_secondes_block.removeClass('cdr-vrt');
				c_minutes_block.removeClass('cdr-org');
				c_secondes_block.removeClass('cdr-org');
				c_minutes_block.addClass('cdr-rge');
				c_secondes_block.addClass('cdr-rge');
				if ((s & 0x2) == 0x2)
				{
					changeFavIcon("icone/icone_m_o.png");
					document.title = ('D R I N G G G G');
				}
				else
				{
					changeFavIcon("icone/icone_m_v.png");
					document.title = ('0:00');
				}
			}
			else
			{
				c_minutes_block.removeClass('cdr-vrt');
				c_secondes_block.removeClass('cdr-vrt');
				c_minutes_block.removeClass('cdr-org');
				c_secondes_block.removeClass('cdr-org');
				c_minutes_block.removeClass('cdr-rge');
				c_secondes_block.removeClass('cdr-rge');
				if ((s & 0x2) == 0x2)
				{
					changeFavIcon("icone/icone_m_r.png");
					document.title = ('DRIiiiiiiiiiiiNG');
				}
				else
				{
					changeFavIcon("icone/icone_m_oi.png");
					document.title = ('DRING... DRING...');
				}
			}
			s = 1 - s;
			var m = Math.floor(s / 60);
			s = Math.floor(s - m * 60);
			depasse = t_depasse;
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
			c_secondes_d.html('<div id="cdr-t-d">' + depasse + '</div>' + ecoule);
			if (sound & 0x1)
			{
				c_minutes_d.text("");
			}
			setTimeout(setDate, 500);
		}
	}

	function getUrlVars()
	{
		var vars =
		{
		};
		var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value)
		{
			vars[key] = value;
		});
		return vars;
	}

	function changeFavIcon($_png)
	{
		//document.getElementById('favicon').setAttribute('href',$_png);
		if (window.chrome)
		{
			var head = document.getElementsByTagName('head')[0];
			
			 var link = document.createElement('link');
			 link.id = 'dynamic-favicon';
			 link.rel = 'shortcut icon';
			 link.type = 'image/png';	   
			 link.href = $_png;
			 
			 var linkFavIcon = document.querySelector('link[rel=icon]');
			 if (linkFavIcon) {
			  head.removeChild(linkFavIcon);
			 }
			 
			 var oldLink = document.getElementById('dynamic-favicon');
			 if (oldLink) {
			  head.removeChild(oldLink);
			 }
			 head.appendChild(link);
		}
		else if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1)
		{			
			var head = document.getElementsByTagName('head')[0];
			
			var favicon = document.createElement('link');
		    favicon.rel = 'icon';
		    favicon.type = 'image/png';	    
		    favicon.href = $_png;
		    head.removeChild(document.querySelector('link[rel=icon]'));
		    head.appendChild(favicon);
		}
	}


	$('.ajax').click(function(event)
	{
		event.preventDefault();
		var $__url = $(this).attr('href');
	});
});
