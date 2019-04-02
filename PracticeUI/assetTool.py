import os
import tkinter as tk
import tkinter.dnd as dnd
import xml.dom.minidom
import windnd

#获取当前列表中选中的项目,并删除
def delete_selection():
    index = listBox.curselection()[0] #列表中当前选中的项目,返回一个数组,在允许多选的情况下可以遍历
    print("删除的索引",index)
    nameList.pop(index)
    print("当前列表中的元素")
    for item in nameList:
        print(item)
    updateList()
    pass

#清空列表
def clear_list():
    nameList.clear()
    updateList()
    print("当前列表中的元素",nameList)
    pass

#更新列表中当前的选项
def updateList():
    listBox.delete(0,tk.END)
    for item in nameList:
        listBox.insert(tk.END,item)
    pass

#拖动文件后的回调
def dropFileFunc(fileList):
    for item in fileList:
        filePath = item.decode("gbk")
        fileName = os.path.basename(filePath)
        print("放入的文件名",fileName)
        nameList.append(fileName)
    updateList()
    pass

#将目前列表中的元素分配到对应的图集中
def packAsset():
    print("当前分配的图集",assetId)
    for img in imgs:
        if img.hasAttribute("name"):
            imgName = img.getAttribute("name")
            if imgName in nameList:
                print("图片包含在列表中",imgName)
                if assetId != "-1":
                    img.setAttribute("atlas",assetId)
                    print("图片设置后的图集",img.getAttribute("atlas")) 
                if assetId == "-1":
                    if img.hasAttribute("atlas"):
                        img.removeAttribute("atlas")
                        print("图片设为默认图集") 
                    else:
                        print("图片已经是默认图集") 

    try:
        with open(packageXmlPath,'w',encoding='UTF-8') as fh:
             # 4.writexml()第一个参数是目标文件对象，第二个参数是根节点的缩进格式，第三个参数是其他子节点的缩进格式，
             # 第四个参数制定了换行格式，第五个参数制定了xml内容的编码。
             DOMTree.writexml(fh,indent='',addindent='',newl='',encoding='UTF-8')
             print('写入xml OK!')
    except Exception as err:
         print('错误信息：{0}'.format(err))
    pass

 #修改当前操作的图集
def alterAssetId():
    global assetId
    assetId = entry.get()
    lbAssetID.config(text ='当前操作的图集编号'+assetId)
    print("设置图集成功,当前图集",assetId)
    pass

curPath = os.getcwd() #获取当前脚本执行的路径
packageXmlPath = curPath+"\\package.xml" #fairyGUI package.xml路径
nameList = [] #操作的文件列表
assetId = "-1" #操作的图集编号
DOMTree = xml.dom.minidom.parse(packageXmlPath)
print("正在解析packageXml...")

root = DOMTree.documentElement
print("xml解析完成")

imgs = root.getElementsByTagName("image")
print("采集图片数据完成")

for img in imgs:
    if img.hasAttribute("name"):
        print(img.getAttribute("name"))

window = tk.Tk()
window.title("图集分类工具")
window.geometry('800x1000')

lbPath = tk.Label(window,
    text = ('当前脚本的运行路径',curPath),
    font=('Arial', 12),     # 字体和字体大小
    width=400, height=1  # 标签长宽
)

lbAssetID = tk.Label(window,
    text = ('当前操作的图集编号',assetId),
    font=('Arial', 12),     # 字体和字体大小
    width=400, height=1  # 标签长宽
)

lbAssetIDTip = tk.Label(window,
    text = ('0~10,-1代表默认图集'),
    font=('Arial', 12),     # 字体和字体大小
    width=400, height=1  # 标签长宽
)

btn_delete = tk.Button(window,text="删除项目",width=15,height=2,command=delete_selection) #删除按钮
btn_pack = tk.Button(window,text="分配到图集中",width=15,height=2,command=packAsset) #分配图集按钮
btn_clearList = tk.Button(window,text="清空列表",width=15,height=2,command=clear_list) #清空列表按钮
btn_alterAssetId = tk.Button(window,text="修改当前操作的图集",width=15,height=2,command=alterAssetId) #修改当前操作的图集按钮

entry = tk.Entry(window,show = None)

listBox = tk.Listbox(window,width = 80,height = 30) #列表
windnd.hook_dropfiles(window,dropFileFunc)

updateList()

lbPath.pack()
lbAssetID.pack()
lbAssetIDTip.pack()
listBox.pack()
btn_delete.pack()
btn_pack.pack()
btn_clearList.pack()
entry.pack()
btn_alterAssetId.pack()

window.mainloop()


