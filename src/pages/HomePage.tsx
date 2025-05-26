
import React, { useState } from 'react';
import { Upload, Camera, ImageIcon, Crown, Sparkles, User, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string>('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const navigate = useNavigate();

  const freeStyles = [
    { id: 'qversion', name: 'Q版漫画', preview: '🎭', description: '可爱萌系风格' },
    { id: 'minimalist', name: '简约线条', preview: '✏️', description: '极简黑白线稿' },
    { id: 'pixel', name: '怀旧像素', preview: '🎮', description: '8-bit复古风' }
  ];

  const premiumStyles = [
    { id: 'cyberpunk', name: '赛博霓虹', preview: '🌃', description: '未来科技感', price: '3元' },
    { id: 'hanfu', name: '古风汉服', preview: '🏮', description: '传统国风', price: '3元' },
    { id: 'seasons', name: '24节气系列', preview: '🌸', description: '限量收藏版', price: '9.9元' }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.size <= 10 * 1024 * 1024) { // 10MB limit
      setSelectedFile(file);
    }
  };

  const handleStyleSelect = (styleId: string) => {
    const premiumStyles = ['cyberpunk', 'hanfu', 'seasons'];
    if (premiumStyles.includes(styleId)) {
      setShowUpgradeDialog(true);
      return;
    }
    setSelectedStyle(styleId);
  };

  const handleGenerate = () => {
    if (selectedFile && selectedStyle && agreedToTerms) {
      navigate('/generate', { 
        state: { 
          file: selectedFile, 
          style: selectedStyle 
        } 
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex flex-col">
      <div className="flex-1 pb-20">
        <Tabs defaultValue="generate" className="max-w-md mx-auto h-full flex flex-col">
          <TabsContent value="generate" className="flex-1 space-y-6 p-4">
            {/* Header */}
            <div className="text-center py-6">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                AI二次元头像工坊
              </h1>
              <p className="text-gray-600 mt-2">10秒生成专属动漫头像</p>
            </div>

            {/* Upload Section */}
            <Card className="border-2 border-dashed border-purple-200">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  {selectedFile ? (
                    <div className="space-y-2">
                      <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                        <ImageIcon className="w-10 h-10 text-green-600" />
                      </div>
                      <p className="text-sm text-green-600 font-medium">{selectedFile.name}</p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedFile(null)}
                      >
                        重新选择
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="w-20 h-20 mx-auto bg-purple-100 rounded-full flex items-center justify-center">
                        <Upload className="w-10 h-10 text-purple-600" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="file-upload" className="cursor-pointer">
                          <Button asChild>
                            <span>
                              <Camera className="w-4 h-4 mr-2" />
                              选择照片
                            </span>
                          </Button>
                        </label>
                        <input
                          id="file-upload"
                          type="file"
                          accept="image/png,image/jpg,image/jpeg"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        <p className="text-xs text-gray-500">支持 PNG/JPG，最大 10MB</p>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Free Styles */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800">免费风格</h3>
              <div className="grid grid-cols-3 gap-3">
                {freeStyles.map((style) => (
                  <Card 
                    key={style.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedStyle === style.id 
                        ? 'ring-2 ring-purple-500 bg-purple-50' 
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => handleStyleSelect(style.id)}
                  >
                    <CardContent className="p-3 text-center">
                      <div className="text-2xl mb-2">{style.preview}</div>
                      <h4 className="text-sm font-medium">{style.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">{style.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Premium Styles */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800 flex items-center">
                <Crown className="w-4 h-4 mr-2 text-yellow-500" />
                付费风格
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {premiumStyles.map((style) => (
                  <Card 
                    key={style.id}
                    className="cursor-pointer transition-all relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200"
                    onClick={() => handleStyleSelect(style.id)}
                  >
                    <CardContent className="p-3 text-center">
                      <div className="absolute top-1 right-1">
                        <Sparkles className="w-3 h-3 text-yellow-500" />
                      </div>
                      <div className="text-2xl mb-2 opacity-70">{style.preview}</div>
                      <h4 className="text-sm font-medium">{style.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">{style.description}</p>
                      <p className="text-xs font-bold text-yellow-600 mt-1">{style.price}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
              />
              <label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                我已阅读并同意
                <span className="text-purple-600 underline cursor-pointer">用户协议</span>
                和
                <span className="text-purple-600 underline cursor-pointer">隐私政策</span>
              </label>
            </div>

            {/* Generate Button */}
            <Button 
              onClick={handleGenerate}
              disabled={!selectedFile || !selectedStyle || !agreedToTerms}
              className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              {!selectedFile ? '请先上传照片' : 
               !selectedStyle ? '请选择风格' : 
               !agreedToTerms ? '请同意用户协议' : 
               '开始生成 ✨'}
            </Button>

            {/* Footer */}
            <div className="text-center text-xs text-gray-400 pb-4">
              <p>使用AI技术，10秒生成专属头像</p>
              <p className="mt-1">会员用户享受无限生成特权</p>
            </div>
          </TabsContent>

          <TabsContent value="profile" className="flex-1 p-4">
            <div className="max-w-md mx-auto">
              <div className="text-center py-8">
                <User className="w-16 h-16 mx-auto mb-4 text-purple-600" />
                <h2 className="text-xl font-semibold mb-2">个人中心</h2>
                <p className="text-gray-600 mb-6">管理您的账户和生成历史</p>
                <Button 
                  onClick={() => navigate('/profile')}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  进入个人中心
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Fixed Bottom Tab Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <Tabs defaultValue="generate" className="max-w-md mx-auto">
          <TabsList className="grid w-full grid-cols-2 bg-transparent rounded-none h-16">
            <TabsTrigger value="generate" className="flex flex-col items-center space-y-1 data-[state=active]:bg-purple-50 data-[state=active]:text-purple-600">
              <Sparkles className="w-5 h-5" />
              <span className="text-xs">生成</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex flex-col items-center space-y-1 data-[state=active]:bg-purple-50 data-[state=active]:text-purple-600">
              <User className="w-5 h-5" />
              <span className="text-xs">我的</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Upgrade Dialog */}
      <Dialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog}>
        <DialogContent className="max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-center">
              <Crown className="w-6 h-6 mr-2 text-yellow-500" />
              升级会员
            </DialogTitle>
            <DialogDescription className="text-center">
              解锁所有付费风格和无限生成特权
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-2">会员特权</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• 解锁所有付费风格</li>
                <li>• 无限次数生成</li>
                <li>• 优先处理队列</li>
                <li>• 高清无水印下载</li>
              </ul>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">¥19.9</div>
              <div className="text-sm text-gray-500">月度会员</div>
            </div>
          </div>

          <DialogFooter className="flex flex-col space-y-2">
            <Button 
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              onClick={() => {
                setShowUpgradeDialog(false);
                console.log('处理支付');
              }}
            >
              立即开通会员
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setShowUpgradeDialog(false)}
            >
              稍后再说
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HomePage;
