<!doctype html>
<html lang="es">
<head>
<?php
require("../../head.php");
?>
	<link href="../../style/back.css" type="text/css" rel="stylesheet" />
</head>
<body onload="$('.contenido').fadeIn(900);">
	<div class="container">
		<div class="lateral_izq">
			LATERAL IZQ
		</div>
		<div class="lateral_izq_inferior">

		</div>

		<div class="lateral_dch">
			<?php
			require("../../dcha.php");
			?>
		</div>

		<div class="centro">

			<?php
			require("../../menu.php");
			?>

			<div class="contenido" id="contenido">
				<img class="imagen" src="../../images/paracaidas_1200.jpg" />
				<span class="piedefoto">Foto: <a href="http://www.jaellevi.com/">Jael Levi</a></span>
				<br>
				<table class="tablagrupo">
					<tr>
						<td class="datos"><!--<a href="#"><span>Fotos HD</span></a> · --> <a href="prensa_Paracaidas.pdf"><span>Nota de prensa</span></a> · <a href="paracaidas_Stage.jpg"><span>Rider</span></a></td>
						<td class="social">
							<a class="iconos facebook" href="http://www.facebook.com/paracaidasband"></a>
							<a class="iconos instagram" href="http://instagram.com/paracaidas_"></a>
							<a class="iconos bandcamp" href="http://paracaidas.bandcamp.com"></a>
						</td>
					</tr>
				</table>
				<p>
Paracaídas son cuatro amigos con una capacidad asombrosa para simultanear
y multiplicar sin control proyectos paralelos y perpendiculares, la mayoría
de ellos, compartidos. Los primeros ensayos datan de diciembre de 2011
y sus esporádicos conciertos, desde febrero de 2012, eran la única manera de
seguirles la pista. Hasta ahora. Miguel e Iñaki (Atención Tsunami, Incendios,
Karen Koltrane), Rodrigo (Incendios, Dol, Hestiu Ròïn) y Pablo (Autumn Comets,
Bel Bee Be, Karen Koltrane) entregan con Pensamiento de paz durante
un ataque aéreo las pruebas de que esto de Paracaídas también va en serio.
				</p>
				<br>
				<!-- <script>
				setTimeout(function(){ $("#contenido").append('<iframe src="//player.vimeo.com/video/122724051?color=ffffff&amp;byline=0&amp;portrait=0" min-width="660px" width="100%" height="405px" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe><br><br>'); }, 200);
			</script> -->
			</div>
		</div>
	</div>
</body>
</html>
