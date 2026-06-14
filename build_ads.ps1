# â”€â”€ Google Ads Campaign Builder â€” Kevin Graham Karimi â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
$xlPath = "e:\react project\kevin-graham-profile\Google_Ads_Campaign_1.xlsx"

Get-Process -Name "EXCEL" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Milliseconds 800

$xl = New-Object -ComObject Excel.Application
$xl.Visible = $false
$xl.DisplayAlerts = $false
$xl.ScreenUpdating = $false
$wb = $xl.Workbooks.Add()

function WriteRow($ws,$row,$vals){$c=1;foreach($v in $vals){$ws.Cells.Item($row,$c).Value2=$v;$c++}}
function StyleHdr($ws,$row,$cols,$bg=0x1F4E79,$fg=0xFFFFFF){
    $r=$ws.Range($ws.Cells.Item($row,1),$ws.Cells.Item($row,$cols))
    $r.Font.Bold=$true;$r.Interior.Color=$bg;$r.Font.Color=$fg
    $r.HorizontalAlignment=-4108
}
function WrapText($ws,$col){
    $ws.Columns.Item($col).WrapText=$true
    $ws.Columns.Item($col).ColumnWidth=45
}

# â”€â”€ AD DATA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
# Each row: Camp,AG,Type,H1..H15,D1..D4,URL,P1,P2
$ADS = @(
 @("C1 - Core Project Finance","AG1 - Project Finance & Structuring","Responsive Search Ad",
   "International Project Finance","Expert Finance Structuring","Project Finance Advisory",
   "Structured Capital Solutions","Bankable Project Structures","Finance Structuring Expert",
   "Global Project Finance","Large-Scale Project Funding","Senior Debt & Mezzanine",
   "Cross-Border Finance Advisory","Project Funding Specialist","Structured Finance Solutions",
   "Kevin Graham: Finance Expert","Syndicated Loan Advisory","Private Capital Placement",
   "Kevin Graham: structured project finance advisory worldwide.",
   "Bankable debt structures, mezzanine finance & cross-border funding.",
   "From application to financial close. Book a consultation today.",
   "Senior debt, mezzanine & equity. We structure funding that closes.",
   "https://grahamkarimi.com/services/project-funding","project","finance"),

 @("C1 - Core Project Finance","AG2 - Debt & Mezzanine Finance","Responsive Search Ad",
   "Debt Structuring Advisory","Mezzanine Finance Expert","Restructure Your Project Debt",
   "Optimise Your Capital Stack","Senior Debt Solutions","Refinancing & Debt Rescheduling",
   "Mezzanine & Bridge Finance","Reduce Your Cost of Capital","Syndicated Loan Arrangement",
   "Acquisition Funding Expert","Project Debt Finance Advisory","Cross-Border Debt Solutions",
   "Kevin Graham: Debt Advisor","International Debt Structuring","Capital Stack Optimisation",
   "Restructure your debt for better terms. Mezzanine & senior finance.",
   "Kevin Graham designs fundable debt structures from `$5M to `$500M.",
   "Optimise your capital stack. Lower cost of capital, extend tenor.",
   "Mezzanine, bridge & refinancing through Kevin Graham's network.",
   "https://grahamkarimi.com/services/project-funding","debt","structuring"),

 @("C2 - Investor & Capital Discovery","AG3 - Find Investors","Responsive Search Ad",
   "Find Investors for Projects","Investors Ready to Fund You","Connect With Active Investors",
   "Match With the Right Investor","Angel & VC Investor Access","Investor Matching Service",
   "Investors Seeking Projects Now","Find Investors Who Fund Now","How to Find Investors Fast",
   "Pitch to Verified Investors","Investor Contacts Worldwide","Smart Investor Discovery",
   "Active Investors. Apply Now.","Your Investor Is Waiting","Start Finding Investors Today",
   "Find verified investors actively seeking projects to fund. Apply now.",
   "Connect with global investors. Submit your pitch, get matched in days.",
   "Stop cold-emailing. Reach investors aligned with your sector and stage.",
   "Investors looking for projects to fund. Get matched with the right one.",
   "https://grahamkarimi.com/services/project-funders-and-investors","find","investors"),

 @("C2 - Investor & Capital Discovery","AG4 - International Finance","Responsive Search Ad",
   "International Project Funders","World Funding Organizations","Global Project Finance",
   "International Capital Access","Fund Your Project Worldwide","Cross-Border Project Finance",
   "Global Funder Network","Project Funders Worldwide","Multilateral Finance Access",
   "Global Capital for Projects","International Finance Network","DFI & Global Fund Access",
   "International Funding Unlocked","Private International Finance","Find Funders in 80+ Countries",
   "International funders, DFIs & project investors in 80+ countries.",
   "International investors & world funding organizations. Connect fast.",
   "International project finance across Africa, Asia & the Americas.",
   "Global funder network. Cross-border project finance. Apply today.",
   "https://grahamkarimi.com/services/project-funders-and-investors","international","finance"),

 @("C2 - Investor & Capital Discovery","AG5 - Private Capital & Lenders","Responsive Search Ad",
   "Private Lenders for Projects","Private Finance Solutions","Top Funding Companies",
   "Private Capital Available Now","Access Private Lending Today","Funding Companies Worldwide",
   "Private Lender Network","Private Finance, Fast Results","Private Finance for Your Deal",
   "Find a Private Lender Now","Private Capital, No Red Tape","Alternative Finance Options",
   "Compare Funding Companies","Private Sector Project Finance","Best Funding Companies 2026",
   "Private lenders and funding companies ready to back your project.",
   "Bypass the banks. Access private capital, fast decisions, flexibility.",
   "Verified private finance companies. Compare and get funded faster.",
   "Private sector capital for projects of all sizes. No red tape.",
   "https://grahamkarimi.com/services/project-funding","private","capital"),

 @("C2 - Investor & Capital Discovery","AG6 - Business Partners & Networks","Responsive Search Ad",
   "Find Business Partners Today","Entrepreneurs Seeking Partners","Business Partner Matching",
   "Joint Venture Opportunities","Find Co-Founders & Investors","Partner With Global Investors",
   "Chinese Investors Contact List","Int'l Business Partners","International Investor Network",
   "Reach Chinese Investors Today","Asian Investors for Projects","Global Business Connections",
   "Find Entrepreneurs to Partner","Strategic Partners for Growth","Network With Global Investors",
   "Find business partners and investors in 100+ countries. Connect now.",
   "Chinese investors, Asian capital & int'l partners for your project.",
   "Joint ventures, co-founders & global investor introductions. Apply.",
   "Entrepreneurs and investors seeking partnerships. Find your match.",
   "https://grahamkarimi.com/services/project-funders-and-investors","partners","network"),

 @("C3 - Apply / Get Funded","AG7 - Project Funding Applications","Responsive Search Ad",
   "Apply for Project Funding Now","Get Funded in Days, Not Months","Project Funding Made Simple",
   "We Fund Projects Worldwide","Start Your Funding Application","Fast Approval, Real Capital",
   "Access Funding for Any Project","Secure Your Project Finance","How to Get Funding Fast",
   "Funding Applications Open Now","Your Project Deserves Capital","Connect With Project Funders",
   "Project Finance, Simplified","Get Funders for Your Project","International Project Funding",
   "Apply for project funding today. Connect with verified funders in 48h.",
   "Submit your project and get matched to global funders ready to invest.",
   "Free application. Project funding from concept to financial close.",
   "We match entrepreneurs with active project funders. Start applying.",
   "https://grahamkarimi.com/services/project-funding","apply","funding"),

 @("C3 - Apply / Get Funded","AG8 - Business Finance","Responsive Search Ad",
   "Business Funding Available Now","Finance Your Business Today","Credit & Finance Solutions",
   "Flexible Business Funding","Get Business Capital Fast","Financing for Every Business",
   "Business Loans & Funding","Apply for Business Finance","Credit Finance for Businesses",
   "Smart Financing for Projects","Unlock Business Finance","Business Credit Solutions",
   "Fast Business Funding Offers","Secure Capital for Growth","Funding for SMEs & Startups",
   "Business funding for SMEs, startups & large projects. Apply now.",
   "Flexible financing with competitive terms. Fast approvals available.",
   "One application. Multiple financing offers from verified providers.",
   "Credit and finance solutions for every business stage. Start today.",
   "https://grahamkarimi.com/services/project-funding","business","funding"),

 @("C3 - Apply / Get Funded","AG9 - Funding Opportunities 2026","Responsive Search Ad",
   "Funding Opportunities 2026","Top Funding Programs Open Now","New Funding Rounds Available",
   "2026 Project Funding Grants","Explore Funding Opportunities","Apply Before Deadline Closes",
   "Funding for Every Stage","Active Funding Calls Open","2026 Funding: Apply Today",
   "Unlock 2026 Capital Access","Global Funding Programs 2026","Find 2026 Project Grants",
   "Verified Funding Opportunities","Limited Spots: Apply Now","Project Funding - Apply Free",
   "2026 funding opportunities for projects across all industries. Apply.",
   "New funding rounds open weekly. Apply before 2026 deadlines close.",
   "Get matched to 2026 funding programs that fit your project profile.",
   "Grants, investments & loans available in 2026. Explore options now.",
   "https://grahamkarimi.com/services/project-funding","funding","2026"),

 @("C4 - Africa & Emerging Markets","AG10 - Africa Project Funding","Responsive Search Ad",
   "Funding for African Projects","Africa Project Finance","Fund Your African Project",
   "African Development Finance","Investors for Africa Projects","Africa Infrastructure Funding",
   "Project Capital for Africa","African Project Finance Expert","Finance for African Developers",
   "Development Finance Africa","Fund Projects Across Africa","African Business Funding",
   "Get Funded in Africa","Africa Investment Finance","Africa & Global Funders",
   "Kevin Graham connects African project developers with global funders.",
   "Development finance, DFIs & private capital for African projects.",
   "Infrastructure, real estate, energy & agri funding across Africa.",
   "International investors seek African projects to fund. Apply now.",
   "https://grahamkarimi.com/services/project-funding","africa","funding"),

 @("C4 - Africa & Emerging Markets","AG11 - Nigeria & West Africa","Responsive Search Ad",
   "Private Investors in Nigeria","Investors in Nigeria","Nigeria Project Funding",
   "Find Investors in Nigeria","Nigeria Business Investors","Fund Your Nigeria Project",
   "Ghana Project Investors","West Africa Funding","Investors in West Africa",
   "Fund Projects in Ghana","Africa Investor Network","Nigeria & Ghana Funding",
   "West Africa Capital Access","African Investor Contacts","Fund Your West Africa Deal",
   "Connect with investors in Nigeria & Ghana looking for projects. Apply.",
   "Private investors in Nigeria ready to back projects. Find yours now.",
   "Access funding for projects in Nigeria, Ghana & West Africa.",
   "West Africa project funding -- connect with verified investors now.",
   "https://grahamkarimi.com/services/project-funding","nigeria","investors"),

 @("C5 - Sector-Specific Funding","AG12 - Real Estate Finance","Responsive Search Ad",
   "Real Estate Project Funding","Real Estate Financing","Fund Your Property Project",
   "Commercial Real Estate Finance","Residential Project Funding","Real Estate Capital Access",
   "Private Real Estate Finance","Property Development Finance","Real Estate Investors",
   "Hotel & Mixed-Use Finance","Real Estate Funding Expert","Apply for Real Estate Finance",
   "Structured Property Finance","Kevin Graham: RE Finance","Buy, Build & Finance Property",
   "Real estate financing for developers and investors. Structured deals.",
   "Residential, commercial & mixed-use project funding. Apply today.",
   "Private and institutional real estate finance. Kevin Graham advisory.",
   "Real estate project funding. We structure deals and secure capital.",
   "https://grahamkarimi.com/services/project-funding","real-estate","funding"),

 @("C5 - Sector-Specific Funding","AG13 - Agriculture Funding","Responsive Search Ad",
   "Agriculture Funding","Farm Funding Available Now","Agri Finance Solutions",
   "Agriculture Project Funding","Fund Your Farm or Agri Biz","Agriculture Finance Expert",
   "Agribusiness Funding Access","Farm & Agriculture Investors","Rural Development Finance",
   "Agriculture Funding 2026","Apply for Farm Funding","Agri Investment Finance",
   "Food & Agri Project Funding","Africa Agriculture Funding","Farming Capital Available",
   "Agriculture funding for farms, agribusiness & rural development.",
   "Farm funding and agriculture finance. Access capital for your project.",
   "Agribusiness funding opportunities across Africa & globally. Apply.",
   "From farm funding to large agri projects -- connect to capital now.",
   "https://grahamkarimi.com/services/project-funding","agriculture","funding"),

 @("C5 - Sector-Specific Funding","AG14 - Trade & Green Finance","Responsive Search Ad",
   "Trade Finance Solutions","Trade Credit Available Now","Green Financing Expert",
   "Sustainable Project Finance","ESG Finance Advisory","Venture Capital Financing",
   "Alternative Finance Options","Trade & Green Finance","Import/Export Trade Finance",
   "Green Bond Financing","Trade Finance Advisor","Peer Lending Alternatives",
   "Carbon Finance Solutions","Green Project Funding","VC & Alternative Finance",
   "Trade finance & trade credit solutions for import/export businesses.",
   "Green financing for sustainable projects. Access ESG-aligned capital.",
   "Venture capital & alternative financing for innovative projects.",
   "Trade credit, green bonds & venture finance -- find your match.",
   "https://grahamkarimi.com/services/project-funding","trade","finance")
)

# â”€â”€ SHEET 1: Google Ads Upload â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
$ws1 = $wb.Worksheets(1)
$ws1.Name = "Google Ads Upload"
$hdr1 = @("Campaign","Ad Group","Ad Type",
  "Headline 1","Headline 2","Headline 3","Headline 4","Headline 5",
  "Headline 6","Headline 7","Headline 8","Headline 9","Headline 10",
  "Headline 11","Headline 12","Headline 13","Headline 14","Headline 15",
  "Description 1","Description 2","Description 3","Description 4",
  "Final URL","Path 1","Path 2")
WriteRow $ws1 1 $hdr1; StyleHdr $ws1 1 $hdr1.Count
$r=2
foreach($ad in $ADS){ WriteRow $ws1 $r $ad; $r++ }
# Freeze top row
$ws1.Application.ActiveWindow.SplitRow = 1
$ws1.Application.ActiveWindow.FreezePanes = $true
$ws1.Rows(1).RowHeight = 22
for($c=1;$c -le 3;$c++){$ws1.Columns.Item($c).ColumnWidth=28}
for($c=4;$c -le 18;$c++){$ws1.Columns.Item($c).ColumnWidth=32}
for($c=19;$c -le 22;$c++){$ws1.Columns.Item($c).ColumnWidth=45}
$ws1.Columns.Item(23).ColumnWidth=50
$ws1.Columns.Item(24).ColumnWidth=14
$ws1.Columns.Item(25).ColumnWidth=14

# â”€â”€ SHEET 2: Campaign Settings â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
$ws2 = $wb.Worksheets.Add()
$ws2.Name = "Campaign Settings"
$hdr2 = @("Campaign","Daily Budget (USD)","Bidding Strategy","Network","Target Locations","Language","Ad Schedule","Status","Notes")
WriteRow $ws2 1 $hdr2; StyleHdr $ws2 1 $hdr2.Count
$camps = @(
 @("C1 - Core Project Finance","`$40-60","Target CPA / Max Conversions","Search Only","Global","English","Mon-Fri 7am-10pm","Active","B2B high-value keywords - top priority"),
 @("C2 - Investor & Capital Discovery","`$30-45","Max Clicks then tCPA","Search Only","Global","English","Mon-Fri 8am-9pm","Active","Mid-funnel investor search"),
 @("C3 - Apply / Get Funded","`$50-70","Max Conversions","Search Only","Global + Africa","English","All week 6am-11pm","Active","Bottom-funnel - highest conversion intent"),
 @("C4 - Africa & Emerging Markets","`$25-35","Max Clicks","Search Only","UK, Africa, Global","English","All week","Active","Geo-targeted - strong niche for Kevin"),
 @("C5 - Sector-Specific Funding","`$20-30","Max Clicks","Search Only","Global","English","Mon-Fri","Active","Sector retargeting - use with RLSA")
)
$r=2; foreach($c in $camps){ WriteRow $ws2 $r $c; $r++ }
$ws2.Columns.Item(1).ColumnWidth=30
$ws2.Columns.Item(9).ColumnWidth=40
for($c=2;$c -le 8;$c++){$ws2.Columns.Item($c).ColumnWidth=22}

# â”€â”€ SHEET 3: Keywords â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
$ws3 = $wb.Worksheets.Add()
$ws3.Name = "Keywords"
$hdr3 = @("Campaign","Ad Group","Keyword","Match Type","Bid (USD)","Intent / Notes")
WriteRow $ws3 1 $hdr3; StyleHdr $ws3 1 $hdr3.Count
$kw = @(
 # C1
 @("C1 - Core Project Finance","AG1 - Project Finance & Structuring","project funding services","[Exact]","3.20","Core B2B service term"),
 @("C1 - Core Project Finance","AG1 - Project Finance & Structuring","international project finance","[Exact]","3.50","Primary service"),
 @("C1 - Core Project Finance","AG1 - Project Finance & Structuring","project finance structuring","[Exact]","3.30","Core service"),
 @("C1 - Core Project Finance","AG1 - Project Finance & Structuring","project debt financing","[Exact]","3.00","Service keyword"),
 @("C1 - Core Project Finance","AG1 - Project Finance & Structuring","private capital placement","[Exact]","3.10","Service keyword"),
 @("C1 - Core Project Finance","AG1 - Project Finance & Structuring","cross border funding solutions","[Exact]","2.80","Service keyword"),
 @("C1 - Core Project Finance","AG1 - Project Finance & Structuring","acquisition funding","[Exact]","3.20","Service keyword"),
 @("C1 - Core Project Finance","AG1 - Project Finance & Structuring","project funding services","Broad Match","2.50","Broad discovery"),
 @("C1 - Core Project Finance","AG2 - Debt & Mezzanine Finance","debt structuring advisory","[Exact]","3.40","Primary service"),
 @("C1 - Core Project Finance","AG2 - Debt & Mezzanine Finance","mezzanine finance","[Exact]","3.60","High commercial intent"),
 @("C1 - Core Project Finance","AG2 - Debt & Mezzanine Finance","syndicated loan arrangement","[Exact]","3.20","Service keyword"),
 @("C1 - Core Project Finance","AG2 - Debt & Mezzanine Finance","development finance","[Exact]","2.90","Broad service"),
 @("C1 - Core Project Finance","AG2 - Debt & Mezzanine Finance","mezzanine finance","Phrase","3.00","Phrase match"),
 @("C1 - Core Project Finance","AG2 - Debt & Mezzanine Finance","debt structuring","Phrase","2.80","Phrase match"),
 # C2
 @("C2 - Investor & Capital Discovery","AG3 - Find Investors","find investors","[Exact]","3.20","High intent"),
 @("C2 - Investor & Capital Discovery","AG3 - Find Investors","how to find investors","[Exact]","2.90","How-to intent"),
 @("C2 - Investor & Capital Discovery","AG3 - Find Investors","investors looking for projects to fund","[Exact]","3.50","High intent"),
 @("C2 - Investor & Capital Discovery","AG3 - Find Investors","investors looking for projects","Phrase","3.00","Phrase match"),
 @("C2 - Investor & Capital Discovery","AG3 - Find Investors","find investors","Phrase","2.60","Phrase match"),
 @("C2 - Investor & Capital Discovery","AG4 - International Finance","international investors","[Exact]","2.80","Geo intent"),
 @("C2 - Investor & Capital Discovery","AG4 - International Finance","project funders worldwide","[Exact]","2.50","Global intent"),
 @("C2 - Investor & Capital Discovery","AG4 - International Finance","world funding organizations","[Exact]","2.30","Org-level intent"),
 @("C2 - Investor & Capital Discovery","AG4 - International Finance","international finance","Phrase","2.10","Broad phrase"),
 @("C2 - Investor & Capital Discovery","AG4 - International Finance","international investors","Phrase","2.40","Phrase match"),
 @("C2 - Investor & Capital Discovery","AG5 - Private Capital & Lenders","private lender","[Exact]","3.40","High intent"),
 @("C2 - Investor & Capital Discovery","AG5 - Private Capital & Lenders","private finance","[Exact]","3.10","Service intent"),
 @("C2 - Investor & Capital Discovery","AG5 - Private Capital & Lenders","funding companies","[Exact]","2.70","Research intent"),
 @("C2 - Investor & Capital Discovery","AG5 - Private Capital & Lenders","private lender","Phrase","2.90","Phrase match"),
 @("C2 - Investor & Capital Discovery","AG5 - Private Capital & Lenders","funding companies","Phrase","2.30","Phrase match"),
 @("C2 - Investor & Capital Discovery","AG6 - Business Partners & Networks","entrepreneurs looking for business partners","[Exact]","2.00","Networking intent"),
 @("C2 - Investor & Capital Discovery","AG6 - Business Partners & Networks","chinese investors contacts","[Exact]","2.80","Geo-specific"),
 @("C2 - Investor & Capital Discovery","AG6 - Business Partners & Networks","business partners","Phrase","1.80","Phrase match"),
 @("C2 - Investor & Capital Discovery","AG6 - Business Partners & Networks","international investors","Phrase","2.40","Phrase match"),
 # C3
 @("C3 - Apply / Get Funded","AG7 - Project Funding Applications","apply for funding","[Exact]","2.50","Action intent"),
 @("C3 - Apply / Get Funded","AG7 - Project Funding Applications","apply for project funding","[Exact]","2.80","Action intent"),
 @("C3 - Apply / Get Funded","AG7 - Project Funding Applications","how to get funding for a project","[Exact]","2.20","How-to intent"),
 @("C3 - Apply / Get Funded","AG7 - Project Funding Applications","how to get funders for my project","Phrase","1.90","How-to phrase"),
 @("C3 - Apply / Get Funded","AG7 - Project Funding Applications","apply for funding","Phrase","1.80","Phrase match"),
 @("C3 - Apply / Get Funded","AG8 - Business Finance","business funding","[Exact]","3.00","High volume"),
 @("C3 - Apply / Get Funded","AG8 - Business Finance","financing for projects","[Exact]","2.60","Service intent"),
 @("C3 - Apply / Get Funded","AG8 - Business Finance","credit finance","[Exact]","2.40","Finance intent"),
 @("C3 - Apply / Get Funded","AG8 - Business Finance","project funding","Phrase","2.20","Broad phrase"),
 @("C3 - Apply / Get Funded","AG8 - Business Finance","business funding","Phrase","2.50","Phrase match"),
 @("C3 - Apply / Get Funded","AG9 - Funding Opportunities 2026","funding opportunities 2026","[Exact]","2.10","Time-specific"),
 @("C3 - Apply / Get Funded","AG9 - Funding Opportunities 2026","project funding","Phrase","2.00","Broad phrase"),
 @("C3 - Apply / Get Funded","AG9 - Funding Opportunities 2026","funding opportunities","Phrase","1.90","Phrase match"),
 # C4
 @("C4 - Africa & Emerging Markets","AG10 - Africa Project Funding","funding for african projects","[Exact]","2.20","Geo-specific"),
 @("C4 - Africa & Emerging Markets","AG10 - Africa Project Funding","africa investors","[Exact]","2.40","Geo-specific"),
 @("C4 - Africa & Emerging Markets","AG10 - Africa Project Funding","investors looking for projects to fund in africa","[Exact]","2.80","High geo intent"),
 @("C4 - Africa & Emerging Markets","AG10 - Africa Project Funding","development finance","Phrase","2.50","Finance phrase"),
 @("C4 - Africa & Emerging Markets","AG10 - Africa Project Funding","africa project funding","Phrase","2.10","Geo phrase"),
 @("C4 - Africa & Emerging Markets","AG11 - Nigeria & West Africa","private investors in nigeria","[Exact]","2.60","Geo-specific"),
 @("C4 - Africa & Emerging Markets","AG11 - Nigeria & West Africa","investors in nigeria","[Exact]","2.50","Geo-specific"),
 @("C4 - Africa & Emerging Markets","AG11 - Nigeria & West Africa","investors looking for projects to fund in ghana","[Exact]","2.40","Geo-specific"),
 @("C4 - Africa & Emerging Markets","AG11 - Nigeria & West Africa","nigeria investors","Phrase","2.00","Phrase match"),
 @("C4 - Africa & Emerging Markets","AG11 - Nigeria & West Africa","west africa funding","Phrase","1.80","Phrase match"),
 # C5
 @("C5 - Sector-Specific Funding","AG12 - Real Estate Finance","real estate financing","[Exact]","3.50","High commercial intent"),
 @("C5 - Sector-Specific Funding","AG12 - Real Estate Finance","real estate funding","[Exact]","3.30","High commercial intent"),
 @("C5 - Sector-Specific Funding","AG12 - Real Estate Finance","property development finance","[Exact]","3.20","Service intent"),
 @("C5 - Sector-Specific Funding","AG12 - Real Estate Finance","real estate finance","Phrase","2.80","Phrase match"),
 @("C5 - Sector-Specific Funding","AG12 - Real Estate Finance","commercial real estate funding","Phrase","3.00","Phrase match"),
 @("C5 - Sector-Specific Funding","AG13 - Agriculture Funding","agriculture funding","[Exact]","2.30","Sector intent"),
 @("C5 - Sector-Specific Funding","AG13 - Agriculture Funding","agriculture funding opportunities","[Exact]","2.10","Research intent"),
 @("C5 - Sector-Specific Funding","AG13 - Agriculture Funding","farm funding","[Exact]","2.40","Sector intent"),
 @("C5 - Sector-Specific Funding","AG13 - Agriculture Funding","agribusiness funding","Phrase","2.00","Phrase match"),
 @("C5 - Sector-Specific Funding","AG13 - Agriculture Funding","agriculture funding","Phrase","1.90","Phrase match"),
 @("C5 - Sector-Specific Funding","AG14 - Trade & Green Finance","trade finance","[Exact]","3.80","High commercial intent"),
 @("C5 - Sector-Specific Funding","AG14 - Trade & Green Finance","trade credit","[Exact]","3.50","High commercial intent"),
 @("C5 - Sector-Specific Funding","AG14 - Trade & Green Finance","green financing","[Exact]","2.80","ESG intent"),
 @("C5 - Sector-Specific Funding","AG14 - Trade & Green Finance","venture capital financing","[Exact]","3.20","VC intent"),
 @("C5 - Sector-Specific Funding","AG14 - Trade & Green Finance","peer to peer lending sites","[Exact]","2.60","Alt finance"),
 @("C5 - Sector-Specific Funding","AG14 - Trade & Green Finance","trade finance","Phrase","3.20","Phrase match"),
 @("C5 - Sector-Specific Funding","AG14 - Trade & Green Finance","green finance","Phrase","2.40","Phrase match")
)
$r=2; foreach($k in $kw){ WriteRow $ws3 $r $k; $r++ }
for($c=1;$c -le 6;$c++){$ws3.Columns.Item($c).ColumnWidth=if($c -eq 3 -or $c -eq 6){42}else{28}}

# â”€â”€ SHEET 4: Assets - Sitelinks â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
$ws4 = $wb.Worksheets.Add()
$ws4.Name = "Assets - Sitelinks"
$hdr4 = @("Level","Campaign / Ad Group","Sitelink Text (max 25)","Description 1 (max 35)","Description 2 (max 35)","Final URL")
WriteRow $ws4 1 $hdr4; StyleHdr $ws4 1 $hdr4.Count
$sl = @(
 @("Account","ALL CAMPAIGNS","Project Funding","Apply for project finance advisory","Structured capital for large projects","https://grahamkarimi.com/services/project-funding"),
 @("Account","ALL CAMPAIGNS","Investor Access","Connect with global project funders","Private capital & DFI access","https://grahamkarimi.com/services/project-funders-and-investors"),
 @("Account","ALL CAMPAIGNS","Book Consultation","Schedule a free 30-minute call","Speak directly with Kevin Graham","https://calendly.com/kevingraham"),
 @("Account","ALL CAMPAIGNS","About Kevin Graham","Director, Risk & Compliance","20+ years international finance","https://grahamkarimi.com/about"),
 @("Account","ALL CAMPAIGNS","Contact Us","WhatsApp, email or enquiry form","Response guaranteed in 48 hours","https://grahamkarimi.com"),
 @("Account","ALL CAMPAIGNS","All Services","Finance & compliance advisory","Kevin Graham's full service range","https://grahamkarimi.com/services"),
 @("Campaign","C1 - Core Project Finance","Debt Structuring","Expert mezzanine & senior debt","Fundable structures, fast close","https://grahamkarimi.com/services/project-funding"),
 @("Campaign","C1 - Core Project Finance","Syndicated Loans","Multi-lender loan arrangement","Large ticket funding solutions","https://grahamkarimi.com/services/project-funding"),
 @("Campaign","C3 - Apply / Get Funded","Apply Now","Submit your project today","Free enquiry, 48h response","https://grahamkarimi.com/services/project-funding"),
 @("Campaign","C4 - Africa & Emerging Markets","Africa Funding","Projects across 54 countries","DFI & private capital access","https://grahamkarimi.com/services/project-funding")
)
$r=2; foreach($s in $sl){ WriteRow $ws4 $r $s; $r++ }
for($c=1;$c -le 6;$c++){$ws4.Columns.Item($c).ColumnWidth=if($c -eq 6){50}else{30}}

# â”€â”€ SHEET 5: Assets - Callouts & Snippets â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
$ws5 = $wb.Worksheets.Add()
$ws5.Name = "Assets - Callouts & Snippets"

# Callouts header
WriteRow $ws5 1 @("CALLOUT ASSETS","","","","","")
$ws5.Cells.Item(1,1).Font.Bold=$true
$ws5.Cells.Item(1,1).Font.Size=12
$ws5.Cells.Item(1,1).Interior.Color=0x375623
$ws5.Cells.Item(1,1).Font.Color=0xFFFFFF
WriteRow $ws5 2 @("Level","Campaign / Ad Group","Callout Text (max 25 chars)","Char Count","","")
StyleHdr $ws5 2 4 0x4472C4 0xFFFFFF
$co = @(
 @("Account","ALL","Response in 48 Hours"),
 @("Account","ALL","Confidential Enquiries"),
 @("Account","ALL","20+ Years Experience"),
 @("Account","ALL","Projects from `$5M+"),
 @("Account","ALL","Global Funder Network"),
 @("Account","ALL","No Upfront Commitment"),
 @("Account","ALL","Free Initial Consultation"),
 @("Account","ALL","60+ Countries Served"),
 @("Account","ALL","Verified Investors Only"),
 @("Account","ALL","Expert Finance Advisory")
)
$r=3
foreach($c in $co){
    WriteRow $ws5 $r $c
    $ws5.Cells.Item($r,4).Formula = "=LEN(C$r)"
    $r++
}

# Structured Snippets
$ws5.Cells.Item($r+1,1).Value2="STRUCTURED SNIPPET ASSETS"
$ws5.Cells.Item($r+1,1).Font.Bold=$true
$ws5.Cells.Item($r+1,1).Font.Size=12
$ws5.Cells.Item($r+1,1).Interior.Color=0x375623
$ws5.Cells.Item($r+1,1).Font.Color=0xFFFFFF
$r+=2
WriteRow $ws5 $r @("Level","Campaign","Header Type","Value 1","Value 2","Value 3","Value 4","Value 5","Value 6","Value 7","Value 8")
StyleHdr $ws5 $r 11 0x4472C4 0xFFFFFF
$r++
$snips = @(
 @("Account","ALL","Services","Project Funding","Debt Structuring","Trade Finance","Real Estate Finance","Agriculture Funding","Green Financing","Private Capital","Syndicated Loans"),
 @("Account","ALL","Sectors","Infrastructure","Real Estate","Energy","Agriculture","Manufacturing","Trade Operations","",""),
 @("Account","ALL","Types","Senior Debt","Mezzanine Finance","Equity Capital","Bridge Finance","DFI Access","Trade Credit","","")
)
foreach($s in $snips){ WriteRow $ws5 $r $s; $r++ }
for($c=1;$c -le 11;$c++){$ws5.Columns.Item($c).ColumnWidth=22}

# â”€â”€ SHEET 6: Char Count Check â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
$ws6 = $wb.Worksheets.Add()
$ws6.Name = "Char Count Check"
$hdr6 = @("Ad #","Campaign","Ad Group","Field","Text","Char Count","Max Allowed","Status")
WriteRow $ws6 1 $hdr6; StyleHdr $ws6 1 $hdr6.Count 0x1F4E79 0xFFFFFF

$row6 = 2
$adNum = 1
foreach($ad in $ADS){
    $camp=$ad[0]; $ag=$ad[1]
    # Headlines = indices 3-17, Descriptions = 18-21
    for($i=3;$i -le 17;$i++){
        $fieldName="Headline $(($i-2))"
        $txt=$ad[$i]
        $len=$txt.Length
        $max=30
        $status=if($len -gt $max){"TOO LONG"}else{"OK"}
        WriteRow $ws6 $row6 @($adNum,$camp,$ag,$fieldName,$txt,$len,$max,$status)
        if($status -eq "TOO LONG"){
            $ws6.Range($ws6.Cells.Item($row6,1),$ws6.Cells.Item($row6,8)).Interior.Color=0xFFC7CE
            $ws6.Cells.Item($row6,8).Font.Color=0x9C0006
        } else {
            $ws6.Range($ws6.Cells.Item($row6,1),$ws6.Cells.Item($row6,8)).Interior.Color=0xC6EFCE
            $ws6.Cells.Item($row6,8).Font.Color=0x375623
        }
        $row6++
    }
    for($i=18;$i -le 21;$i++){
        $fieldName="Description $(($i-17))"
        $txt=$ad[$i]
        $len=$txt.Length
        $max=90
        $status=if($len -gt $max){"TOO LONG"}else{"OK"}
        WriteRow $ws6 $row6 @($adNum,$camp,$ag,$fieldName,$txt,$len,$max,$status)
        if($status -eq "TOO LONG"){
            $ws6.Range($ws6.Cells.Item($row6,1),$ws6.Cells.Item($row6,8)).Interior.Color=0xFFC7CE
            $ws6.Cells.Item($row6,8).Font.Color=0x9C0006
        } else {
            $ws6.Range($ws6.Cells.Item($row6,1),$ws6.Cells.Item($row6,8)).Interior.Color=0xC6EFCE
            $ws6.Cells.Item($row6,8).Font.Color=0x375623
        }
        $row6++
    }
    $adNum++
}
$ws6.Columns.Item(5).ColumnWidth=55
for($c=1;$c -le 4;$c++){$ws6.Columns.Item($c).ColumnWidth=30}
$ws6.Columns.Item(6).ColumnWidth=12
$ws6.Columns.Item(7).ColumnWidth=12
$ws6.Columns.Item(8).ColumnWidth=14

# â”€â”€ ORDER SHEETS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
# Move sheets into order: Upload, Settings, Keywords, Sitelinks, Callouts, Char Check
$ws1.Move($wb.Worksheets(1))
# Sheets were added in reverse so reorder
$targetOrder = @("Google Ads Upload","Campaign Settings","Keywords","Assets - Sitelinks","Assets - Callouts & Snippets","Char Count Check")
for($i=0;$i -lt $targetOrder.Count;$i++){
    try { $wb.Worksheets($targetOrder[$i]).Move($wb.Worksheets($i+1)) } catch {}
}

# â”€â”€ SAVE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
if(Test-Path $xlPath){ Remove-Item $xlPath -Force }
$wb.SaveAs($xlPath, 51)  # 51 = xlOpenXMLWorkbook (.xlsx)
$wb.Close($false)
$xl.Quit()
[System.Runtime.InteropServices.Marshal]::ReleaseComObject($xl) | Out-Null
[System.GC]::Collect()
[System.GC]::WaitForPendingFinalizers()
Write-Output "DONE: $xlPath"


