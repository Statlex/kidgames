(function (win) {

	"use strict";
	/*global window */

	win.sections = win.sections || {};

	win.sections.matchstickPuzzles = {
		name: 'Matchstick puzzles',
		lang: 'en',
		questions: [
			{
				title: 'Star to 6 rhombuses',
				text: 'Move 6 sticks to create 6 Rhombuses (or 6 diamonds)._!_http://3.bp.blogspot.com/-JQR9p4tywBc/VAM7YktnnxI/AAAAAAAAEbg/iCP315VsLEA/s320/m0207_v.png',
				
				answer: 'http://2.bp.blogspot.com/-wzFndN89r7A/VAM779WYJzI/AAAAAAAAEbo/TKYJIEErNGw/s320/m0207_a.png'
			},
			{
				title: 'Square 4X4: Remove sticks leaving no squares',
				text: 'What is the MINIMUM number of sticks to be removed leaving NO squares?_!_http://1.bp.blogspot.com/-GAaHv8mRPiM/VAGKeQQgGNI/AAAAAAAAEbI/4mK8mmbmb_A/s320/m0206_v.png',
				
				answer: 'http://2.bp.blogspot.com/-JIAB_-85cbE/VAGKu5UWOpI/AAAAAAAAEbQ/PTSsmExhqPs/s320/m0206_a.png_!_A minimum of 10 sticks must be removed. There are also other solutions.'
			},
			{
				title: 'Move 2 creating 4 rectangles and 2 squares',
				text: 'http://1.bp.blogspot.com/-iQ9i3ntBI2g/U_n3Rq6GQQI/AAAAAAAAEVs/aadXpsv4Ahk/s320/m0205_v.png_!_Move only 2 sticks to create 4 rectangles and 2 squares.',
				
				answer: 'http://2.bp.blogspot.com/-H36p02G4Hi0/U_n3dOzv0PI/AAAAAAAAEV0/0vkpWpi2lFk/s320/m0205_a.png'
			},
			{
				title: 'Mathematical : 1 plus 2 minus 3 is not 199',
				text: 'http://3.bp.blogspot.com/-652PVesqDLc/U_CN6JwxyII/AAAAAAAAEVU/LSrVujdG2mE/s320/m0204_v.png_!_There is a bit of a cheekiness about this one! Move only 1 stick to make the above equation true.',
				
				answer: 'http://3.bp.blogspot.com/-mhFsI3mjYe0/U_CODdItY_I/AAAAAAAAEVc/Fpd-2qg5U8k/s320/m0204_a.png'
			},
			{
				title: 'Rectangle 4X2 : Remove 10 leaving 5 squares',
				text: 'http://3.bp.blogspot.com/-e0UFuBjPbfc/U-XoAmacSSI/AAAAAAAAEU8/5R7eK3fcft8/s320/m0203_v.png_!_Remove 10 sticks leaving exactly 5 squares. The squares don\'t have to be equal in size.',
				
				answer: 'http://4.bp.blogspot.com/-oQefJu8EdQw/U-XodEbNijI/AAAAAAAAEVE/bL-oZ2CUT7E/s320/m0203_a.png_!_There are also other solutions'
			},
			{
				title: 'No squares to 2 squares',
				text: 'http://4.bp.blogspot.com/-iJ-qylMu6_Y/U9yTDk0gofI/AAAAAAAAEUk/bXWKDYIpfPg/s320/m0202_v.png_!_There are no squares in the figure. Move 4 sticks to form 2 squares. All the sticks must form part of the formation of the 2 squares. The the 2 squares don\'t have to be equal in size.',
				
				answer: 'http://3.bp.blogspot.com/-xAbTgl4-RXM/U9yTe3NBNLI/AAAAAAAAEUs/5iJ2APnnOKE/s320/m0202_a.png'
			},
			{
				title: 'A rhombus and a triangle',
				text: 'http://4.bp.blogspot.com/-jWN9BOf_paU/U9O6wMxERQI/AAAAAAAAEUE/AzWVmEfPM4w/s320/m0201_v.png_!_Move 2 sticks to create a rhombus and a triangle.',
				
				answer: 'http://3.bp.blogspot.com/-cAGENbzjC8g/U9O65TEz9WI/AAAAAAAAEUM/Z_Cg1yPQSBc/s320/m0201_a.png'
			},
			{
				title: 'Big squares and small squares',
				text: 'http://4.bp.blogspot.com/-oNjHYUrnxKU/U8qeyKlOuiI/AAAAAAAAETg/pTr1sRs8zyg/s320/m0200_v.png_!_Shown above are 2 squares (size 3X3) and 1 smaller square (size 2X2). Move 8 sticks to create 3 squares with sizes 2X2 and 4 smaller squares with sizes 1X1. All sticks must be flat on the surface.',
				
				answer: 'http://2.bp.blogspot.com/-ecy4tmoswbc/U8qiq7iXxPI/AAAAAAAAET0/CcVMeJc3dAs/s320/m0200_a.png'
			},
			{
				title: 'Create 3 parallelograms and 2 triangles',
				text: 'http://2.bp.blogspot.com/-aPfXKWYItdo/U8H3U4VtwTI/AAAAAAAAEPE/yodxgy_VRLc/s320/m0199_v.png_!_Add 9 sticks to form 3 parallelograms and 2 triangles.',
				
				answer: 'http://3.bp.blogspot.com/-noLnup4BeYk/U8H4LuF7IUI/AAAAAAAAEPM/cQa_rkn4Nz0/s320/m0199_a.png'
			},
			{
				title: 'Move 1 stick creating 8 squares',
				text: 'http://1.bp.blogspot.com/-zrvrhqswGq0/U7kBo0MK0_I/AAAAAAAAEOs/dz4n66vnK4E/s320/m0198_v.png_!_There are 7 squares of size 1X1 in the figure. Move only 1 stick to create 8 squares. 6 squares must be of size 1X1 and 2 squares of size 2X2.',
				
				answer: 'http://2.bp.blogspot.com/-U4DhSq6F9bo/U7kBz5ujUXI/AAAAAAAAEO0/kxFs5bdB1ts/s320/m0198_a.png'
			},
			{
				title: 'Two plus one is three',
				text: 'http://1.bp.blogspot.com/-G-O4gkfrKmk/U7hNJPVnLfI/AAAAAAAAEOU/zaJ4v8wOM_Y/s320/m0197_v.png_!_Another tongue-in-the-cheek! The sum of the 3 numbers (1 + 5078 + 2) in the figure is 5081. Remove 3 sticks to change the answer of the sum to 3.',
				hint: 'Try first turn the puzzle around.',
				answer: 'http://4.bp.blogspot.com/-2w3dzsaoJeU/U7hN2M-8DOI/AAAAAAAAEOc/oTPbkoQhrjw/s320/m0197_a.png_!_In presenting the answer you should first turn the puzzle around. Now remove the 3 sticks as shown. Then 2 PLUS 1 is 3!'
			},
			{
				title: 'Rectangle 4X2 : Remove 10 leaving 3 squares',
				text: 'http://2.bp.blogspot.com/-U6LhEeHCuyY/U7cASbQX8-I/AAAAAAAAEN8/SFj2sggxEJo/s320/m0196_v.png_!_Remove 10 sticks leaving 3 squares, all equal in size.',
				
				answer: 'http://1.bp.blogspot.com/-Vp2Jejqm8Ro/U7cAqJKlNII/AAAAAAAAEOE/4RJlJC14iM8/s320/m0196_a.png_!_There are also other solutions.'
			},
			{
				title: 'Create a 3 dimensional cube moving 3 sticks',
				text: 'http://2.bp.blogspot.com/-1RSYKC7_kAk/U62pZD7OKLI/AAAAAAAAENk/aIyBPB2qlwk/s320/m0195_v.png_!_Move 3 sticks to form a 3 dimensional cube.',
				
				answer: 'http://1.bp.blogspot.com/-TK_Rt-8CCzE/U62poXRBbZI/AAAAAAAAENs/d08djPNzCxU/s320/m0195_a.png'
			},
			{
				title: 'Forming 7 squares with 24 sticks',
				text: 'http://3.bp.blogspot.com/-soCmQeHl7AA/U6aGxHKxdII/AAAAAAAAENM/kIZlkU1QILg/s320/m0194_v.png_!_6 squares are formed with 24 sticks. All squares have a size of 1X1 matchsticks. Note there are no squares of sizes 2X2, 3X3 or 4X4. How would you arrange the same 24 sticks to form 7 squares with sizes 1X1 and no other bigger sizes?',
				
				answer: 'http://1.bp.blogspot.com/-J9lxQQFV2-s/U6aG8E7MiBI/AAAAAAAAENU/v3k3C91badE/s320/m0194_a.png_!_There are also other solutions.'
			},
			{
				title: 'Squares 4X4: Remove 16 leaving 2 squares of equal size.',
				text: 'http://4.bp.blogspot.com/-VghBV6ZXLAw/U516cEifb3I/AAAAAAAAEM0/9E1VcABdrmQ/s320/m0193_v.png_!_Remove 16 sticks leaving only 2 squares. The 2 squares may overlap.',
				
				answer: 'http://3.bp.blogspot.com/-xil0tagVb3Q/U516tgaAsDI/AAAAAAAAEM8/GczdVccsrbY/s320/m0193_a.png'
			},
			{
				title: 'Mathematical : 99 minus 59 is not 10',
				text: 'http://4.bp.blogspot.com/--wtTuA8LMBU/U5ylNZRf5vI/AAAAAAAAEMc/y60FsTywyuo/s320/m0192_v.png_!_Move only 1 stick to make the equation true.',
				
				answer: 'http://3.bp.blogspot.com/-_xx5cY4xQ9k/U5ylZF3bkUI/AAAAAAAAEMk/ed--f66953k/s320/m0192_a.png'
			},
			{
				title: 'Squares : Increase 7 squares to 9',
				text: 'http://4.bp.blogspot.com/-NPXMaSxlXIc/U5sJ81j31sI/AAAAAAAAEME/tbXbOMAULFU/s320/m0191_v.png_!_Confirm that there are 7 squares in the figure. Now move 4 sticks to create 9 squares. All squares don\'t have to be equal in size, but all sticks must be flat on the surface.',
				
				answer: 'http://1.bp.blogspot.com/-4u6cgPSlSGQ/U5sKrIEW2JI/AAAAAAAAEMM/NoHa5LWhOmQ/s320/m0191_a.png'
			},
			{
				title: 'Count the squares',
				text: 'http://4.bp.blogspot.com/-wcO-DGVUvgA/U5RHCt8Q24I/AAAAAAAAEL0/yv6bIDuR9Hw/s320/m0190_v.png_!_How many squares do you count in the figure above?',
				
				answer: 'ВЅXВЅ match squares: 4<br>1X1 match squares: 17<br>2X2 match squares: 9<br>3X3 match squares: 4<br>4X4 match squares: 1<br>------------------------<br>T O T A L squares: 35'
			},
			{
				title: 'Create 9 rhombuses adding 12 sticks',
				text: 'http://2.bp.blogspot.com/-OtV6rx6QTks/U4q8WAcnTNI/AAAAAAAAELc/fHdvWsuXRk8/s320/m0189_v.png_!_A rhombus (also known as a diamond) is a parallelogram with four sides of EQUAL length and whose angles are NOT right angled. Add 12 sticks to form 9 rhombuses, all equal in size.',
				
				answer: 'http://2.bp.blogspot.com/-QqK-rY-pewg/U4q8erZps2I/AAAAAAAAELk/uDBeneTo3gU/s320/m0189_a.png_!_The 12 sticks added are highlighted in grey.'
			},
			{
				title: 'Create 4 triangles using 6 matchsticks.',
				text: 'http://1.bp.blogspot.com/-OK2IZKd5p6A/U4q3-PPc-gI/AAAAAAAAELQ/I_De6ZoUt9Q/s320/m0188_v.png_!_Shown above are 3 triangles created with 6 sticks. The triangles are numbered 1 to 3. How would you create 4 triangles, still using 6 sticks? Sticks may not be broken and all sticks must be flat on the surface.',
				
				answer: 'http://2.bp.blogspot.com/--ERk1h0Mfs4/U4nHi84Sb_I/AAAAAAAAELA/D_GHsuRJhOI/s320/m0188_a.png'
			},
			{
				title: 'Changing 3 to 9',
				text: 'http://1.bp.blogspot.com/-oCumE5C7TkY/U4IJf-zru5I/AAAAAAAAEG0/VKU-MeZ2xg8/s320/m0187_v.png_!_How would you change the value of the 3 matchsticks to 9 without breaking any sticks? All sticks don\'t have to be flat on the surface and you may only move 2 sticks.',
				hint: 'Try Roman numerals',
				answer: 'http://3.bp.blogspot.com/-kHnk4jE5fqs/U4IJmJX--FI/AAAAAAAAEG8/Bj3H7STO4Vs/s320/m0187_a.png_!_The Roman numeral for the letter 9 is IX.'
			},
			{
				title: 'Divide triangle into 3 equal parts',
				text: 'http://1.bp.blogspot.com/-Vyy1hfz1VHc/U4A3tyvD3yI/AAAAAAAAEA0/3AzyXQTHSSk/s320/m0186_v.png_!_Add only 3 sticks to divide the triangle into 3 equal parts. The shape and size of the 3 parts must be exactly the same.',
				
				answer: 'http://1.bp.blogspot.com/-dSdM9S3Hn2Y/U4A31WF5KsI/AAAAAAAAEA8/SlTHcwtQj2s/s320/m0186_a.png'
			},
			{
				title: 'Rectangle 3X2: Remove 4 leaving 4 equal squares',
				text: 'http://2.bp.blogspot.com/-Q5k5AbpwCA4/U28oUv4Ux-I/AAAAAAAAEAE/ipjne7aU72k/s320/m0185_v.png_!_It is possible to remove 3 sticks leaving 4 equal squares, but can you remove 4 sticks also leaving 4 equal squares?',
				
				answer: 'http://1.bp.blogspot.com/-J7PmC_EqJ-M/U28ob57SkQI/AAAAAAAAEAM/O-f1zPNCoVg/s320/m0185_a.png_!_There are even more than the 3 solutions shown above.'
			},
			{
				title: 'Key to squares',
				text: 'http://4.bp.blogspot.com/-c-BQDElEAdo/U2410u9pVnI/AAAAAAAAD8Q/WT32tN81aQs/s320/m0184_v.png_!_Move 4 sticks to create 3 equal squares.',
				
				answer: 'http://4.bp.blogspot.com/-QiuNK6j2jFc/U242CH6FqGI/AAAAAAAAD8Y/T0mR3-iKbYM/s320/m0184_a.png'
			},
			{
				title: 'Roman numerals: 3 minus 2 is not 5',
				text: 'http://4.bp.blogspot.com/-M_wm4wlRMZs/U245--plvII/AAAAAAAAD8k/ZvurF6gQd20/s320/m0183_v.png_!_Easy one to boost the confidence! Add 1 stick to the Roman numerals to make the equation true.',
				
				answer: 'http://2.bp.blogspot.com/-yLGEtcvQpZ8/U246Ez_s9rI/AAAAAAAAD8s/vPXvbRLDoqY/s320/m0183_a.png'
			},
			{
				title: '7 Equal squares reduced to 5 equal squares',
				text: 'http://3.bp.blogspot.com/-4NO2NZHQC9Y/U2XQDizMieI/AAAAAAAADyE/gVhhUjSXsb0/s320/m0182_v.png_!_There are 7 squares of equal size in the figure. Reduce the number of equal size squares to 5 by moving 3 sticks.',
				
				answer: 'http://4.bp.blogspot.com/-oR04BtpmVVA/U2XQOjqNGsI/AAAAAAAADyM/lfgMHkiJrnA/s320/m0182_a.png'
			},
			{
				title: 'Square in Square',
				text: 'http://2.bp.blogspot.com/-A1VzBO_T8e8/UxraQlXBKuI/AAAAAAAADlM/elKmO5eCsmw/s320/m0002_v.png_!_Shown in the figure are only 3 squares. Move 2 sticks to form 4 squares all equal in size.',
				
				answer: 'http://3.bp.blogspot.com/-yL0DAftf8CE/UxrayN5LSiI/AAAAAAAADlU/7ooA-t5nNIo/s320/m0002_a.png'
			},
			{
				title: 'Egypt',
				text: 'http://4.bp.blogspot.com/-enfKZF4Fvs8/UyagpY2O5pI/AAAAAAAADoQ/_aA_USyAKxs/s320/m0007_v.png_!_Add 3 sticks to form 4 triangles all equal in size. All the sticks don\'t have to be placed flat on the surface.',
				
				answer: 'http://4.bp.blogspot.com/-kwB5ggsdAiY/UyagxBVIR_I/AAAAAAAADoY/e0tMCSnbJbU/s320/m0007_a.png_!_This is a view from the top. It is called a tetrahedron. The sticks are placed three dimensional vertically to form a pyramid. Hence, the name of this puzzle. (Yes, we know the pyramids have 4 sides!)'
			},
			{
				title: 'The Pig and the Tail',
				text: 'http://3.bp.blogspot.com/-yG2puSXxnM0/Uz-lpzttYaI/AAAAAAAADq4/fa-FHg0g4rY/s320/m0009_v.png_!_Shown here is a pig with tail pointing upwards. Move 2 sticks to make the pig look in the opposite direction, but with tail still pointing upwards.',
				
				answer: 'http://2.bp.blogspot.com/-OQ6GE_zQhao/Uz-lw6llPQI/AAAAAAAADrA/C2a7aucTs0s/s320/m0009_a.png'
			},
			{
				title: 'Easterly Fish, Southerly Fish',
				text: 'http://1.bp.blogspot.com/-q6rH4wa4xDc/Uz-n7AnKgHI/AAAAAAAADrM/V0OCrMCN83w/s320/m0010_v.png_!_The fish is swimming in an Easterly direction. Move 2 sticks to make it swim in a Southerly direction. Moving the eye of the fish counts as a normal move.',
				
				answer: 'http://1.bp.blogspot.com/-0T5iu3Uy3yg/Uz-oBu36z6I/AAAAAAAADrU/Pc-pb3c57bA/s320/m0010_a.png'
			},
			{
				title: 'Square 3X3: 14 squares reduced to 5',
				text: 'http://1.bp.blogspot.com/-nDyoopjqgS4/U0pOXOniVwI/AAAAAAAADsA/MDboAb3d8ao/s320/m0011_v.png_!_Shown here are 14 squares in total:<br>3X3 squares: 1<br>2X2 squares: 4<br>1X1 squares: 9<br>Remove 4 sticks to leave only 5 squares, all EQUAL in SIZE.',
				
				answer: 'http://2.bp.blogspot.com/-x26bheV-DFc/U0pOhLU2hSI/AAAAAAAADsI/R6rgeKqEKqA/s320/m0011_a.png'
			},
			{
				title: 'Crossing Sticks',
				text: 'http://3.bp.blogspot.com/-nyKhD7O_yXw/U0pSxM_BerI/AAAAAAAADsk/cefoCTIVoHM/s320/m0012_v.png_!_The challenge in this puzzle is to end with 5 pairs of "crossed" sticks. Sticks are crossed by picking up a stick, jumping over 2 sticks by going either left or right, and then placing it onto the third one. For example, pick up stick number 4, jump over 5 and 6 and place it on 7 to cross it. Remember, a crossed pair counts as 2 sticks when jumping over it. Can you achieve this in 5 jumps?',
				
				answer: 'http://1.bp.blogspot.com/-kbWIEAY0ptg/U0pTxDkcVcI/AAAAAAAADss/qbuPgBqfPqA/s320/m0012_a.png_!_Above is only one solution and there are many more.'
			},
			{
				title: 'Tower upside down moving 4 sticks',
				text: 'http://4.bp.blogspot.com/-ymE-qIUgFzU/U0pVat07SKI/AAAAAAAADs4/9w80SESwqV0/s320/m0014_v.png_!_Move 4 sticks to turn the tower upside down. The form and the structure of the tower should not change.',
				
				answer: 'http://4.bp.blogspot.com/-18CEDdRoXWs/U0pViHegFAI/AAAAAAAADtA/ulhDqpe6ios/s320/m0014_a.png'
			},
			{
				title: 'Short and Long',
				text: 'http://3.bp.blogspot.com/-DG_Vbk1zdRI/U0pd-z9kRKI/AAAAAAAADtk/kIzEdi1nl5U/s320/m0015_v.png_!_The challenge here is to place the sticks as shown in "Start" above, then move them around so that you end with 3 longs sticks next to each other and 2 short sticks next to each other. (As shown in "End" above)<br>The following rules apply when moving sticks:<br>1. Two sticks must be moved at the same time.<br>2. The two sticks must be a long- and a short one.<br>3. The two sticks may not exchange positions when moved.<br>Can you achieve this in 4 steps?',
				
				answer: 'http://2.bp.blogspot.com/-kFEMADSTLnQ/U0pbYhwu8qI/AAAAAAAADtY/kSHJGbcaHUo/s320/m0015_a.png'
			},
			{
				title: 'Add 5 to form 8 Triangles',
				text: 'http://4.bp.blogspot.com/-4F876d3E3Iw/U1FRIDAMXRI/AAAAAAAADug/0nr55xGNipM/s320/m0016_v.png_!_Add 5 sticks to form 8 triangles. All the sticks don\'t have to be flat on the surface.',
				
				answer: 'http://1.bp.blogspot.com/-pfP1BoxRmpc/U1FRUISDYFI/AAAAAAAADuo/n27jXEGLpd4/s320/m0016_a.png_!_There are 6 small triangles and 2 bigger triangles'
			},
			{
				title: 'Square 2X2: Move 4 to form 10 Squares',
				text: 'http://4.bp.blogspot.com/-3TMUah9eous/U1I5NeNK0BI/AAAAAAAADu4/kC5yJ1BFXuM/s320/m0017_v.png_!_Move 4 sticks to form 10 Squares. All the squares don\'t have to be flat on the surface and don\'t have to be the same size.',
				
				answer: 'http://3.bp.blogspot.com/-bnGcPRR44Xw/U1I5V6RaZSI/AAAAAAAADvA/Fvi8_FI5VfI/s320/m0017_a.png'
			},
			{
				title: 'Square 1X1: Add 4 to create 4 Triangles and 2 Squares',
				text: 'http://3.bp.blogspot.com/-s9nTpEtnCFE/U1I6w6yC7NI/AAAAAAAADvM/60x8LtJ2Wvw/s320/m0018_v.png_!_Add 4 sticks to create 4 triangles and 2 squares. The squares don\'t have to be equal in size, but the triangles must be. All the sticks don\'t have to be flat on the surface.',
				
				answer: 'http://1.bp.blogspot.com/-3mfyk4YtQCU/U1I65o3CoOI/AAAAAAAADvU/1Ueqi0GXNfk/s320/m0018_a.png'
			},
			{
				title: 'Triangle 3X3: Remove 3 leaving 7 triangles',
				text: 'http://4.bp.blogspot.com/-yjdEbLm4UBU/U1I8LUyHnLI/AAAAAAAADvg/UHGwR2OLYEA/s320/m0019_v.png_!_Remove 3 sticks leaving 7 triangles. All the triangles don\'t have to be the same size.',
				
				answer: 'http://2.bp.blogspot.com/-Wxw_0PvwKoY/U1I8TOOTJeI/AAAAAAAADvo/GPkD13KKqg0/s320/m0019_a.png_!_There are:<br>3 triangles of size 1X1<br>3 triangles of size 2X2<br>1 triangle of size 3X3'
			},
			{
				title: '5 Equal Squares: Remove 3 leaving 3 squares',
				text: 'http://4.bp.blogspot.com/--89R5sbUckI/U1I_6FctnzI/AAAAAAAADv0/zf4dh2paGUc/s320/m0020_v.png_!_Remove 3 sticks to leave 3 squares of equal size.',
				
				answer: 'http://1.bp.blogspot.com/-CHFwsziSRv8/U1JADE3w6UI/AAAAAAAADv8/oKfIMRKrWQs/s320/m0020_a.png'
			},
			{
				title: 'The King and his Guards',
				text: 'http://3.bp.blogspot.com/-qmQMKYmrjl4/U2XW-DV-qAI/AAAAAAAADyc/8xJdsPTCs50/s320/m0021_v.png_!_A King (marked as "K") sits in the middle of his castle. He is surrounded by 8 guards. (the broken sticks) Each outside wall of the castle is guarded by 3 guards as shown. The King decides to step up his security so that each wall is guarded by 4 guards. How must he do this without employing more guards?',
				
				answer: 'http://3.bp.blogspot.com/-LcNhbHauCuU/U2XXOThWL5I/AAAAAAAADyk/iFxZJqlwbuU/s320/m0021_a.png'
			},
			{
				title: 'T6 Sticks Touching',
				text: 'http://3.bp.blogspot.com/-2YOEHK6nJ1U/U2XjJP4m2OI/AAAAAAAADzs/ecWtarOUk9U/s320/m0023_v.png_!_Place 3 sticks as shown. Note that each stick touches 2 other sticks. The challenge now is to add 3 more sticks so that each stick touches 5 other sticks. All sticks don\'t have to be flat on the surface.',
				
				answer: 'http://1.bp.blogspot.com/-_7LoTtR-F20/U2XjR5WdOZI/AAAAAAAADz0/MZCRyKuNuoE/s320/m0023_a.png'
			},
			{
				title: '14 Squares reduced to 3',
				text: 'http://3.bp.blogspot.com/-o3r7SwtxzZA/U2XkuYBzY3I/AAAAAAAAD0A/y9hCw-mhHjU/s320/m0024_v.png_!_Shown here are 14 squares. Confirm that you agree. (There are 9 squares with side length 1/3 of a matchstick, 4 squares with side length 2/3 of a matchstick and the outer square of side length 1 matchstick). Now remove 2 sticks to leave 3 squares all different in size.',
				
				answer: 'http://1.bp.blogspot.com/-zocbtJ-sAE8/U2XlWL0NW3I/AAAAAAAAD0I/k_VL5s1N-vs/s320/m0024_a.png_!_There is one square with side length 1/3 of a matchstick, another square with side length 2/3 of a matchstick and the last outer square with side length 1 matchstick.'
			}

		]

	};

}(window));