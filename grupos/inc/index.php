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
				<img class="imagen" src="../../images/incendios_1200.jpg" />
				<!--<span class="piedefoto">Foto: Giuseppe Truppi</span>-->
				<br>
				<table class="tablagrupo">
					<tr>
						<td class="datos"><a href="prensa_Incendios.pdf"><span>Nota de prensa</span></a> · <a href="rider_incendios.pdf"><span>Rider</span></a></td>
						<td class="social">
						<a class="iconos facebook" href="http://www.facebook.com/incendiosband"></a>
						<a class="iconos instagram" href="http://instagram.com/losincendios"></a>
						<a class="iconos bandcamp" href="http://losincendios.bandcamp.com"></a>

						</td>
					</tr>
				</table>
				<p>
				Si en su debut, El cuerpo humano (Estoescasa 2013), Incendios ya construían con solvencia paisajes de pop emocional con una madurez y contención a prueba de vueltas, con Las sillas voladoras (RDM 2015) el grupo expande su paleta de colores para permitir que las canciones estallen en múltiples direcciones.				</p>
				<p>
				La matemática espontánea de Incendios genera una ecuación en la que sencillez y complejidad se equilibran: preciosista sin ser efectista, frágil pero poderosa, sensible sin ser cursi, espacial pero doméstica. Como una silla voladora. Compren su ticket y tomen asiento. Despegamos				</p>
				<br>
				<script>
				setTimeout(function(){ $("#contenido").append('<iframe src="https://www.youtube.com/embed/i7MJeYEV81c?rel=0"  min-width="660px" width="100%" height="405px" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe><br><br>'); }, 200);
				</script>
				<!--<script>
				setTimeout(function(){ $("#contenido").append('<iframe src="//player.vimeo.com/video/61909004?color=ffffff&amp;byline=0&amp;portrait=0" min-width="660px" width="100%" height="405px" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe><br><br>'); }, 200);
				</script>-->
			</div>
		</div>
	</div>
</body>
</html>
